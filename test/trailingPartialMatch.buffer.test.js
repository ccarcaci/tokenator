/* eslint-env node */
"use strict"

const trailingPartialMatch = require("../src/trailingPartialMatch")

describe("Check if Buffer trail ends with part of matching Buffer", () => {
  test("Trailing match", () => expect(trailingPartialMatch(
    Buffer.from("Nel mezzo del cam"),
    Buffer.from("cammin"))).toBe(true))
  test("Complete match", () => expect(trailingPartialMatch(
    Buffer.from("cam"),
    Buffer.from("cammin"))).toBe(true))
  test("Force entire match to be not valid", () => expect(trailingPartialMatch(
    Buffer.from("cammin"),
    Buffer.from("cammin"))).toBe(false))
  test("One character match", () => expect(trailingPartialMatch(
    Buffer.from("Nel mezzo del c"),
    Buffer.from("cammin"))).toBe(true))
  test("Unmatching", () => expect(trailingPartialMatch(
    Buffer.from("Nel mezzo del "),
    Buffer.from("cammin"))).toBe(false))
  test("Trailing match", () => expect(trailingPartialMatch(
    Buffer.from("nostra vita"),
    Buffer.from("vita"))).toBe(false))
})
