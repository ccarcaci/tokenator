"use strict"

const tokenator = require("../src/tokenator")

describe("Receive an utf-8 string, generate token array", () => {
  test("1===1 test", () => expect(1===1).toBe(true))

  test("Lazy", () => expect(tokenator("Lazy")).toEqual(["Lazy"]))
  test("Lazy Dog against D", () => expect(tokenator("Lazy Dog", "D")).toEqual([ "Lazy ", "D", "og" ]))
  test("Lazy Dog against Dog against Dog", () => {
    expect(tokenator("Lazy Dog against Dog", "Dog")).toEqual([ "Lazy ", "Dog", " against ", "Dog" ])
  })
  test("Dog edit Dog", () => expect(tokenator("Dog edit Dog", "Dog")).toEqual([ "Dog", " edit ", "Dog" ]))
  test("Dog barks to Duck that watch the Dog barking", () => {
    expect(tokenator("Dog barks to Duck that watch the Dog barking", "Duck", "Dog"))
      .toEqual([ "Dog", " barks to ", "Duck", " that watch the ", "Dog", " barking" ])
  })
  test("Dirty Deeds Done Dirt Cheap", () => expect(tokenator("Dirty Deeds Done Dirt Cheap", "ee", "D", "p"))
    .toEqual([ "D", "irty ", "D", "ee", "ds ", "D", "one ", "D", "irt Chea", "p" ]))
})
