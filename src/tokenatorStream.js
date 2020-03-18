/* eslint-env node */
"use strict"

const stream = require("stream")
const tokenator = require("./tokenator")
const trailingPartialMatch = require("./trailingPartialMatch")

let currentChunk = Buffer.alloc(0)

module.exports = (...separators) => (separatorsEncoding = "utf-8") => {
  const separatorsBufs = separators.map((separator) => Buffer.from(separator, separatorsEncoding))

  return new stream.Transform({
    transform(chunk, _, callback) {
      currentChunk = Buffer.concat([ currentChunk, chunk ])

      if(!trailingPartialMatch(currentChunk, ...separatorsBufs)) {
        tokenator(currentChunk, ...separatorsBufs).forEach((token) => this.push(token))
        currentChunk = Buffer.alloc(0)
      }

      callback()
    },
  })
}
