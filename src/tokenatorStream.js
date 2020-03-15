"use strict"

const stream = require("stream")
const tokenator = require("./tokenator")

module.exports = (...separator) => new stream.Transform({
  transform(chunk, _, callback) {
    tokenator(chunk, ...separator).forEach((token) => this.push(token))
    callback()
  },
})
