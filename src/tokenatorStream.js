"use strict"

const stream = require("stream")
const tokenator = require("./tokenator")

let currentSeparator = ""

const splittingSeparator = (separator, token) => {
  
}

module.exports = (...separators) => new stream.Transform({
  transform(chunk, _, callback) {
    const firstSeparator = separators[0]
    currentSeparator = splittingSeparator(firstSeparator, token)

    tokenator(chunk, ...separators).forEach((token) => this.push(token))
    callback()
  },
})
