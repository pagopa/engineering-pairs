# Pair Generator

This is a GitHub Action that generates pairs of members from the `#area_engineering`
channel every Monday and posts them to a designated channel. 
The purpose of this action is to encourage collaboration and knowledge
sharing among engineering team members.

## Usage

To use this action, simply include it in your GitHub Actions workflow and configure the following environment variables:

- `SLACK_TOKEN`: The Slack bot token to use for posting messages.
- `SLACK_CHANNEL`: The Slack channel ID or name where the pairs should be posted.
- `EXCLUDE_IDS`: A comma-separated list of usernames to exclude from the pairing process.
- `TENOR_TOKEN`: The Tenor API token to use for generating GIFs.

By default, the action will generate pairs from all members in the `#area_engineering` channel. 

If you want to exclude certain members from the pairing process, you can add their user IDs
as a comma separated list (do not use spaces) to the `EXCLUDE_IDS` environment variable.
