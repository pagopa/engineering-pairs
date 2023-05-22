import {
  generateIncrementalPairs,
  getDayNumber,
  getPairs,
  getPeriod,
} from "../distribute";
import { describe, it, expect } from "vitest";

describe("generateIncrementalPairs", () => {
  it("should generate pairs with correct day value", () => {
    const stringList = ["a", "b", "c", "d"];
    const day = 2;
    const expectedPairs = { a: "c", b: "d" };

    const result = generateIncrementalPairs(stringList, day);

    expect(result).toEqual(expectedPairs);
  });
});

describe("getDayNumber", () => {
  it("should return the number of days since 1970", () => {
    const result = getDayNumber(1617235200000);
    expect(result).toBe(18718);
  });

  it("should return the correct day number for a given date", () => {
    const date = new Date("2022-01-01T00:00:00.000Z");
    const expectedDayNumber = 18993;

    const result = getDayNumber(date.getTime());

    expect(result).toEqual(expectedDayNumber);
  });

  it("should return the current day number if no date is provided", () => {
    const expectedDayNumber = Math.floor(Date.now() / 1000 / 60 / 60 / 24);

    const result = getDayNumber();

    expect(result).toEqual(expectedDayNumber);
  });
});

describe("getPeriod", () => {
  it("should return the number of periods since 1970", () => {
    const result = getPeriod(7);
    expect(result).toBe(2785);
  });
});

describe("getPairs", () => {
  it("should return an empty object for an empty input array", () => {
    const input: string[] = [];
    const expected: Record<string, string> = {};

    const result = getPairs(input);

    expect(result).toEqual(expected);
  });

  it("should return an empty object for an input array with one element", () => {
    const input = ["a"];
    const expected: Record<string, string> = {};

    const result = getPairs(input);

    expect(result).toEqual(expected);
  });

  it("should return an object of pairs for an input array with multiple elements", () => {
    const input = ["a", "b", "c", "d"];
    const expected = { a: "b", c: "d" };

    const result = getPairs(input);

    expect(result).toEqual(expected);
  });

  it("should return an object of pairs for an input array with an odd number of elements", () => {
    const input = ["a", "b", "c", "d", "e"];
    const expected = { a: "b", c: "d" };

    const result = getPairs(input);

    expect(result).toEqual(expected);
  });
});
