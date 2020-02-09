"use strict"

const stream = require("stream")
const tokst = require("./tokst")

module.exports = (...separator) => new stream.Transform({
  transform(chunk, _, callback) {
    tokst(chunk.toString(), ...separator).forEach((token) => this.push(token))
    callback()
  },
})
