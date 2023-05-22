export const getDayNumber = (d: number = Date.now()) =>
  Math.floor(d / 1000 / 60 / 60 / 24);

export const getPeriod = (intervalInDays: number = 7) =>
  Math.floor(getDayNumber() / intervalInDays);

/**
 * Generate pairs of strings from a list of strings.
 */
export const generatePairs = (
  stringList: string[],
  period: number = getPeriod()
) =>
  stringList.reduce(
    (acc, firstString, firstIndex) => {
      // take the second string from the list
      // using the period as a shift
      const secondIndex = (firstIndex + period) % stringList.length;
      const secondString = stringList[secondIndex];
      const isAlreadyPaired =
        acc.members.has(secondString) || acc.members.has(firstString);
      // we can safely compare strings using equality
      // as we are using an object as a map
      if (!isAlreadyPaired && firstString !== secondString) {
        // avoid duplicate pairs
        acc.members.add(firstString);
        acc.members.add(secondString);
        // eslint-disable-next-line functional/immutable-data
        acc.pairs[firstString] = secondString;
      }
      return acc;
    },
    { pairs: {}, members: new Set() } as {
      pairs: Record<string, string>;
      members: Set<string>;
    }
  ).pairs;
