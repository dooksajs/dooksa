import { checksum } from '@dooksa/crypto'

const TYPES = {
  Object,
  Array,
  Number,
  Boolean,
  String
}

/**
 * Create xxhash hash from object
 * @param {Object} source - The original object used to create the hash
 * @returns {string} - xxhash 64 string
 */
const objectHash = (source) => {
  try {
    if (!source) {
      throw new Error('source is undefined')
    }

    const target = sortType(defaultType(source), source)

    return checksum(target)
  } catch (e) {
    console.error(e)
  }
}

const defaultType = (value) => {
  const name = value?.constructor.name

  return TYPES[name]()
}

/**
 * Sort source by data type
 * @private
 * @param {Object} target - Alphanumerically sorted object
 * @param {*} source - Current value
 * @returns
 */
const sortType = (target, source) => {
  if (source == null) {
    throw new Error('objectHash: value cannot be undefined')
  }

  if (Array.isArray(source)) {
    source = array(target, source)
  } else if (typeof source === 'object') {
    source = object(target, source)
  } else if (typeof source === 'function') {
    source = source.toString()
  }

  return source
}

/**
 * Traverse arrays values
 * @param {Object} target - Alphanumerically sorted object
 * @param {Array} source - Current nested array
 * @returns {Array}
 */
const array = (target, source) => {
  // make a copy
  target = source.slice()

  for (let i = 0; i < target.length; i++) {
    const value = target[i]

    const targetValue = defaultType(value)
    target[i] = sortType(targetValue, value)
  }

  return target
}

/**
 * Sort object keys alphanumerically
 * @private
 * @param {Object} target - Alphanumerically sorted object
 * @param {Object} source - Current nested object
 * @returns {Object}
 */
const object = (target, source) => {
  const keys = Object.keys(source)

  keys.sort()

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    target[key] = defaultType(source[key])
    target[key] = sortType(target[key], source[key])
  }

  return target
}

export default objectHash
