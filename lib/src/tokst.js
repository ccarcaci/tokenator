"use strict"

const halves = (source, separator) => {
  const fromIndex = source.indexOf(separator)

  if(fromIndex === -1) { return [source] }

  return [
    source.substring(0, fromIndex),
    separator,
    source.substring(fromIndex + separator.length, source.length),
  ]
}

const tokenize = (source, match) => {
  const tokens = halves(source, match)

  if(tokens.length <= 1) { return tokens }

  return [ tokens[0], tokens[1], ...tokenize(tokens[2], match) ]
}

module.exports = (source, match) => tokenize(source, match)
