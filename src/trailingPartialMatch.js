"use strict"

const verifyTrailingSeparator = (chunk, separator) => {
  if(separator.length <= 0
    || chunk.length <= 0
    || chunk.equals(separator)) { return false }


  for(let overlappingIndex = 1; overlappingIndex <= Math.min(chunk.length, separator.length - 1); overlappingIndex++) {
    const matching = chunk.subarray(chunk.length - overlappingIndex, chunk.length)

    if(separator.compare(
      matching,
      0,
      matching.length,
      0,
      overlappingIndex) === 0) { return true }
  }

  return false
}

module.exports = (chunk, ...separators) => {
  return separators.some((separator) => verifyTrailingSeparator(chunk, separator))
}
