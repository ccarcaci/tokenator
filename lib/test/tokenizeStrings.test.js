"use strict"

const tokst = require("../src/tokst")

describe("Receive an utf-8 string, generate token array", () => {
  test("1===1 test", () => expect(1===1).toBe(true))

  test("Lazy", () => expect(tokst("Lazy")).toEqual(["Lazy"]))
  test("Lazy Dog against D", () => expect(tokst("Lazy Dog", "D")).toEqual([ "Lazy ", "D", "og" ]))
// test("Lazy Dog against Dog against Dog", () => expect(tokst("Lazy Dog against Dog", "Dog")).toEqual([ "Lazy ", "Dog", " against ", "Dog" ]))
// test("Dog edit Dog", () => expect(tokst("Dog edit Dog", "Dog")).toEqual([ "Dog", " edit ", "Dog" ]))
})
