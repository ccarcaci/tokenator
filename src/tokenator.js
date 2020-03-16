/* eslint-env node */
"use strict"

const separateString = (source, cuttingPoint, separator) => {
  const sourceLength = source.length
  const separatorLength = separator.length
  const firstPart = source.substring(0, cuttingPoint)
  const secondPart = source.substring(cuttingPoint + separatorLength, sourceLength)

  return [ firstPart, secondPart ]
}

const separateBuffer = (source, cuttingPoint, separator) => {
  const sourceLength = source.length
  const separatorLength = separator.length
  const firstPart = Buffer.alloc(cuttingPoint)
  source.copy(firstPart, 0, 0, cuttingPoint)
  const secondPart = Buffer.alloc(sourceLength - cuttingPoint - separatorLength)
  source.copy(secondPart, 0, cuttingPoint + separatorLength, sourceLength)

  return [ firstPart, secondPart ]
}

const halves = (source, separator) => {
  const cuttingPoint = source.indexOf(separator)
  let separationFunction = separateString

  if(cuttingPoint < 0) { return [source] }
  if(Buffer.isBuffer(source)) { separationFunction = separateBuffer }

  const [ firstPart, secondPart ] = separationFunction(source, cuttingPoint, separator)

  let halves = []

  if(firstPart.length > 0) { halves = [firstPart] }
  halves = [ ...halves, separator ]
  if(secondPart.length > 0) { halves = [ ...halves, secondPart ] }

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

  return multiTokenization(newTokens, matches.slice(1))
}

module.exports = (source, ...matches) => multiTokenization([source], matches)
