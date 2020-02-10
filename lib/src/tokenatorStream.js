"use strict"

const stream = require("stream")
const tokenator = require("./tokenator")

module.exports = (...separator) => new stream.Transform({
  encoding: "utf8",
  decodeStrings: false,
  transform(chunk, encoding, callback) {
    if(encoding === "buffer") { throw Error("Unable to manage buffer encoding, please use utf8 within your readable source stream") }

    tokenator(chunk, ...separator).forEach((token) => this.push(token))
    callback()
  },
})
