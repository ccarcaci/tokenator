"use strict"

const verifyTrailingSeparator = (chunk, separator) => {
  if(separator.length <= 0
    || chunk.length <= 0
    || chunk.equals(separator)) { return false }

  for(let overlappingIndex = 1; overlappingIndex <= Math.min(chunk.length, separator.length); overlappingIndex++) {
    const matching = separator.subarray(0, overlappingIndex)

    if(chunk.compare(
      matching,
      0,
      matching.length,
      chunk.length - overlappingIndex,
      chunk.length) === 0) { return true }
  }

  return false
}

module.exports = (chunk, ...separators) => {
  return separators.some((separator) => verifyTrailingSeparator(chunk, separator))
}
