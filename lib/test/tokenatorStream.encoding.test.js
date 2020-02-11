/* eslint-disable max-nested-callbacks */
"use strict"

const stream = require("stream")
const tokenatorStream = require("../src/tokenatorStream")

test("Maintain ut8 encoding", (done) => {
  const reader = new stream.Readable({
    encoding: "utf8",
    read() {
      this.push("Source")
      this.push(null)
    },
  })
  const writer = new stream.Writable({
    decodeStrings: false,
    write: (_, encoding) => {
      expect(encoding).toBe("utf8")
      done()
    },
  })

  reader.pipe(tokenatorStream())
    .pipe(writer)
})
