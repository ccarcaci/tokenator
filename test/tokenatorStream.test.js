/* eslint-disable max-nested-callbacks, max-lines-per-function */
"use strict"

const streamMock = require("stream-mock")
const tokenatorStream = require("../src/tokenatorStream")

describe("Receive chunks, transform them in stream of tokens", () => {
  test("Send Lazy string with no separators", (done) => {
    const source = ["Lazy"]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream()())
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

    reader.pipe(tokenatorStream("D")())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString())).toEqual([ "Lazy ", "D", "og" ])
      done()
    })
  })

  test("Splitting token belongs to two different incoming chunks", (done) => {
    const source = [ "Nel mezzo del cam", "min di nostra vita" ]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream("cammin")())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString()))
        .toEqual([ "Nel mezzo del ", "cammin", " di nostra vita" ])
      done()
    })
  })

  test("Token can be resembled on multiple chunks", (done) => {
    const source = [ "Nel mezzo del c", "a", "m", "m", "i", "n di nostra vita" ]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream("cammin")())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString()))
        .toEqual([ "Nel mezzo del ", "cammin", " di nostra vita" ])
      done()
    })
  })

  test("Verify working with multiple separators", (done) => {
    const source = [ "Nel mezzo del cam", "min di nos", "tra vita" ]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream("cammin", "nostra")())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString()))
        .toEqual([ "Nel mezzo del ", "cammin", " di ", "nostra", " vita" ])
      done()
    })
  })

  test("Verify working with separators on head and trail", (done) => {
    const source = ["Nel mezzo del cammin di nostra vita"]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream("Nel", "vita")())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString()))
        .toEqual([ "Nel", " mezzo del cammin di nostra ", "vita" ])
      done()
    })
  })

  test("Verify against particular utf-8 chars", (done) => {
    const hl7Header = "\u000b"
    const hl7Trailer = "\u001c\u000d"

    const source = [`${hl7Header}eenie${hl7Trailer}`]
    const reader = new streamMock.ObjectReadableMock(source)
    const writer = new streamMock.ObjectWritableMock()

    reader.pipe(tokenatorStream(hl7Header, hl7Trailer)())
      .pipe(writer)

    writer.on("finish", () => {
      expect(writer.data.map((tokenBuf) => tokenBuf.toString()))
        .toEqual([ hl7Header, "eenie", hl7Trailer ])
      done()
    })
  })
})
