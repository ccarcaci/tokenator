/* eslint-disable max-nested-callbacks */
"use strict"

const streamMock = require("stream-mock")
const tokenatorStream = require("../src/tokenatorStream")

describe("Receive chunks, transform them in stream of tokens", () => {
  test("Send Lazy string with no separators", (done) => {
    const source = ["Lazy"]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream())
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

    reader.pipe(tokenatorStream("D"))
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString())).toEqual([ "Lazy ", "D", "og" ])
      done()
    })
  })
  test("Splitting token belongs to two different incoming chunks", (done) => {
    const source = ["Nel mezzo del cam", "min di nostra vita"]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream("cammin"))
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString())).toEqual([ "Nel mezzo del ", "cammin", " di nostra vita" ])
      done()
    })
  })
})
