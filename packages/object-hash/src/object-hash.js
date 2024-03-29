import { hash, sortObject } from '@dooksa/utils'

/**
 * Create xxhash hash from object
 * @param {Object} source - The original object used to create the hash
 * @returns {string} - xxhash 64 string
 */
function objectHash (source) {
  hash.init()

  const target = sortObject(source)

  return hash.update(target).digest('hex')
}

export default objectHash
