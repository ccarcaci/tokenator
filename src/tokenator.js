/* eslint-env node */
"use strict"

const separateString = (source, cuttingPoint, separator) => {
  const sourceLength = source.length
  const separatorLength = separator.length
  let halves = []
  const firstHalf = source.substring(0, cuttingPoint)
  const secondHalf = source.substring(cuttingPoint + separatorLength, sourceLength)

  if(firstHalf !== "") { halves = [firstHalf] }
  halves = [ ...halves, separator ]
  if(secondHalf !== "") { halves = [ ...halves, secondHalf ] }

  return halves
}

const separateBuffer = (source, cuttingPoint, separator) => {
  const sourceLength = source.length
  const separatorLength = separator.length
  const firstPart = Buffer.alloc(cuttingPoint)
  source.copy(firstPart, 0, 0, cuttingPoint)
  const secondPart = Buffer.alloc(sourceLength - cuttingPoint - separatorLength)
  source.copy(secondPart, 0, cuttingPoint + separatorLength, sourceLength)

  let halves = []

  if(firstPart.length > 0) { halves = [firstPart] }
  halves = [ ...halves, separator ]
  if(secondPart.length > 0) { halves = [ ...halves, secondPart ] }

  return halves
}

const halves = (source, separator) => {
  const cuttingPoint = source.indexOf(separator)

  if(cuttingPoint < 0) { return [source] }
  if(Buffer.isBuffer(source)) { return separateBuffer(source, cuttingPoint, separator) }

  return separateString(source, cuttingPoint, separator)
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

  return multiTokenization(newTokens, matches.slice(1))
}

module.exports = (source, ...matches) => multiTokenization([source], matches)
