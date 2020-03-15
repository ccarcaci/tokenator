/* eslint-env node */
/* eslint-disable max-lines-per-function */
"use strict"

const tokenator = require("../src/tokenator")

describe("Perform tests on Buffer data", () => {
  test("Buffer - Lazy", () => expect(tokenator(Buffer.from("Lazy")))
    .toEqual([
      Buffer.from("Lazy")]))
  test("Buffer - Lazy Dog against D", () => expect(tokenator(Buffer.from("Lazy Dog"), Buffer.from("D")))
    .toEqual([
      Buffer.from("Lazy "),
      Buffer.from("D"),
      Buffer.from("og") ]))
  test("Buffer - Lazy Dog against Dog against Dog", () => {
    expect(tokenator(Buffer.from("Lazy Dog against Dog"), Buffer.from("Dog")))
      .toEqual([
        Buffer.from("Lazy "),
        Buffer.from("Dog"),
        Buffer.from(" against "),
        Buffer.from("Dog") ])
  })
  test("Buffer - Dog edit Dog", () => expect(tokenator(Buffer.from("Dog edit Dog"), Buffer.from("Dog")))
    .toEqual([
      Buffer.from("Dog"),
      Buffer.from(" edit "),
      Buffer.from("Dog") ]))
  test("Buffer - Dog barks to Duck that watch the Dog barking", () => {
    expect(tokenator(
      Buffer.from("Dog barks to Duck that watch the Dog barking"),
      Buffer.from("Duck"),
      Buffer.from("Dog")))
      .toEqual([
        Buffer.from("Dog"),
        Buffer.from(" barks to "),
        Buffer.from("Duck"),
        Buffer.from(" that watch the "),
        Buffer.from("Dog"),
        Buffer.from(" barking") ])
  })
  test("Buffer - Dirty Deeds Done Dirt Cheap", () => {
    expect(tokenator(Buffer.from("Dirty Deeds Done Dirt Cheap"), Buffer.from("D")))
      .toEqual([
        Buffer.from("D"),
        Buffer.from("irty "),
        Buffer.from("D"),
        Buffer.from("eeds "),
        Buffer.from("D"),
        Buffer.from("one "),
        Buffer.from("D"),
        Buffer.from("irt Cheap") ])
  })
})
