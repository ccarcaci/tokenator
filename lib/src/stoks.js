"use strict"

const stream = require("stream")

module.exports = (/* separator */) => new stream.Transform({
  transform(chunk, _, callback) {
    this.push(chunk)
    callback()
  },
})
