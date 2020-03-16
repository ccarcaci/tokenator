"use strict"

const tokenator = require("../src/tokenator")

describe("Run against extended ascii string", () => {
  test("ÇüÇ", () => expect(tokenator("ÇüÇ", "ü")).toEqual(["Ç", "ü", "Ç"]))
})
