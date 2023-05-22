import * as dotenv from "dotenv";
import { WebClient } from "@slack/web-api";
import { generatePairs } from "./distribute";

dotenv.config();

// users excluded from the pairs
const excludedIds = new Set(
  process.env.EXCLUDE_IDS ? process.env.EXCLUDE_IDS.split(",") : []
);

// to obtain gifs from tenor
const tenorToken = process.env.TENOR_TOKEN;
if (!tenorToken) {
  throw new Error("TENOR_TOKEN is not defined");
}

// slack api key
const slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
  throw new Error("SLACK_TOKEN is not defined");
}

// to post to a specific channel
const slackChannel = process.env.SLACK_CHANNEL;
if (!slackChannel) {
  throw new Error("SLACK_CHANNEL is not defined");
}

const slackClient = new WebClient(slackToken);
if (!slackClient) {
  throw new Error("Could not create slack client");
}

const headline = (dateString: string) =>
  `:wave: here the weekly pairs for the week of ${dateString}. Please reach out to your pair and schedule a time to meet.`;

const getGif = async () => {
  const res = await fetch(
    `https://tenor.googleapis.com/v2/search?q=programming&key=${tenorToken}&random=true` +
      `&client_key=engineering_pairs&limit=1&media_filter=tinygif,gif&locale=en_US&contentfilter=medium&ar_range=standard`
  );
  const json = await res.json();
  return {
    url: json.results[0].media_formats.gif.url,
    description: json.results[0].content_description,
  };
};

async function getChannelMembers(channelName: string): Promise<string[]> {
  const members: string[] = [];
  // eslint-disable-next-line functional/no-let
  let response = await slackClient.conversations.members({
    channel: channelName,
  });
  if (response.ok && response.members) {
    // eslint-disable-next-line functional/immutable-data
    members.push(...response.members);
  }
  while (response.response_metadata?.next_cursor) {
    response = await slackClient.conversations.members({
      channel: channelName,
      cursor: response.response_metadata.next_cursor,
    });
    if (response.ok && response.members) {
      // eslint-disable-next-line functional/immutable-data
      members.push(...response.members);
    }
  }
  return members;
}

const formatDate = (date: Date) =>
  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const getMessageFromPairs = (pairs: Record<string, string>) =>
  headline(formatDate(new Date())) +
  `\n\n${Object.entries(pairs)
    .map(([first, second]) => `<@${first}> <@${second}>`)
    .join("\n")}`;

async function assignPairs(
  channelName: string,
  userExcludedIds: Set<string> = excludedIds
): Promise<void> {
  const channelMembers = (await getChannelMembers(channelName)).filter(
    (member) => !userExcludedIds.has(member)
  );

  if (channelMembers.length < 2) {
    // eslint-disable-next-line no-console
    console.log("Not enough members to assign pairs");
    return;
  }

  const pairs = generatePairs(channelMembers);
  const nPairs = Object.keys(pairs).length;

  if (nPairs < 1) {
    // eslint-disable-next-line no-console
    console.log("Cannot get pairs");
    return;
  }

  const gif = await getGif();
  const message = getMessageFromPairs(pairs);

  await slackClient.chat.postMessage({
    channel: channelName,
    text: message,
    icon_emoji: ":wave:",
    blocks: [
      {
        type: "image",
        image_url: gif.url,
        alt_text: gif.description,
      },
      {
        type: "section",
        text: {
          text: message,
          type: "mrkdwn",
        },
        // accessory: {
        //   type: "image",
        //   image_url: gif.url,
        //   alt_text: gif.description,
        // },
      },
    ],
  });
}

// eslint-disable-next-line no-console, @typescript-eslint/no-non-null-assertion
assignPairs(slackChannel!).catch(console.error);
