"use strict"

const stream = require("stream")
const stokst = require("../src/stoks")

describe("Receive chunks, transform them in stream of tokens", () => {
  test("Send Lazy string with no separators", () => {
    const sourceStream = stream.Readable.from(["Lazy"], { encoding: "utf-8" })
    const testingStream = new stream.Writable()
    // eslint-disable-next-line no-underscore-dangle
    testingStream._write = (chunk, _, callback) => {
      expect(chunk.toString()).toBe("Lazy")
      callback()
    }
    sourceStream.pipe(stokst())
      .pipe(testingStream)

    sourceStream.push("Lazy")
  })
/*  test("Lazy Dog against D", async () => {
    const sourceStream = stream.Readable.from([ "Lazy" ], { encoding: "utf-8" })
    const testingStream = new stream.Writable()
    testingStream._write = (chunk, _, callback) => {
      expect(chunk.toString()).toBe("Lazy")
      callback()
    }
    sourceStream.pipe(stokst("D"))
      .pipe(testingStream)

    sourceStream.push("Lazy")
  })
*/
})
