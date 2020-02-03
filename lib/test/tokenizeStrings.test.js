"use strict"

const tokst = require("../src/tokst")

describe("Receive an utf-8 string, generate token array", () => {
  test("1===1 test", () => expect(1===1).toBe(true))

  test("Lazy", () => expect(tokst("Lazy")).toBe("Lazy"))
//  test("Lazy Dog against D", () => expect(tokst("Lazy Dog", "D")).toBe([ "Lazy ", "D", "og" ]))
})
