/* eslint-env node */
/* eslint-disable max-nested-callbacks */
"use strict"

const streamMock = require("stream-mock")
const tokenatorStream = require("../src/tokenatorStream")

describe("Receive chunks, transform them in stream of tokens", () => {
  test("Send Lazy string with no separators", (done) => {
    const source = [Buffer.from("Lazy")]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data).toEqual([Buffer.from("Lazy")])
      done()
    })
  })
  test("Lazy Dog against D", (done) => {
    const source = [Buffer.from("Lazy Dog")]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream(Buffer.from("D")))
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data).toEqual([
        Buffer.from("Lazy "),
        Buffer.from("D"),
        Buffer.from("og") ])
      done()
    })
  })
})
