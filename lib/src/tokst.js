"use strict"

const halves = (source, separator) => {
  const fromIndex = source.indexOf(separator)

  if(fromIndex === -1) { return [source] }

  let halves = []
  const firstHalf = source.substring(0, fromIndex)
  const secondHalf = source.substring(fromIndex + separator.length, source.length)

  if(firstHalf !== "") { halves = [firstHalf] }
  halves = [ ...halves, separator ]
  if(secondHalf !== "") { halves = [ ...halves, secondHalf ] }

  return halves
}

const tokenize = (source, match) => {
  const tokens = halves(source, match)

  if(tokens.length <= 1) { return tokens }
  if(tokens.length <= 2) { return [ tokens[0], ...tokenize(tokens[1], match) ] }

  return [ tokens[0], tokens[1], ...tokenize(tokens[2], match) ]
}

const singleTokenization = (tokens, match) => tokens.flatMap((token) => tokenize(token, match))

const multiTokenization = (tokens, matches) => {
  if(matches.length <= 0) { return tokens }

  const newTokens = singleTokenization(tokens, matches[0])

  return multiTokenization(newTokens, ...matches.slice(1))
}

module.exports = (source, matches) => multiTokenization([ source ], ...matches)
