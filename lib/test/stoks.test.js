/* eslint-disable max-nested-callbacks */

"use strict"

const streamMock = require("stream-mock")
const stokst = require("../src/stoks")

describe("Receive chunks, transform them in stream of tokens", () => {
  test("Send Lazy string with no separators", (done) => {
    const source = ["Lazy"]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(stokst())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString())).toEqual(["Lazy"])
      done()
    })
  })
  test("Lazy Dog against D", (done) => {
    const source = ["Lazy Dog"]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(stokst("D"))
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString())).toEqual([ "Lazy ", "D", "og" ])
      done()
    })
  })
})
