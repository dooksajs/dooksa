import { createPlugin } from '@dooksa/create-plugin'

/**
 * Two or one values to run an operator on
 * @typedef {(string[]|number[])} OperatorValues
 * @example
 * [1, 2]
 * ['hello', 'world]
 * [0]
 */

const operator = createPlugin('operator', ({ defineActions, defineActionSchema }) => {
  const operators = {
    /**
     * Equality
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '==': v => v[0] === v[1],
    /**
     * Inequality
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '!=': v => v[0] !== v[1],
    /**
     * Greater than
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '>': v => v[0] > v[1],
    /**
     * Greater than or equal operator
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '>=': v => v[0] >= v[1],
    /**
     * Less than
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '<': v => v[0] < v[1],
    /**
     * Less than or equal operator
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '<=': v => v[0] <= v[1],
    /**
     * Logical NOT
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '!': v => !v[0],
    /**
     * Remainder operator
     * @private
     * @param {number[]} v
     * @returns {number}
     */
    '%': v => v[0] % v[1],
    /**
     * Increment operator
     * @private
     * @param {number[]} v
     * @returns {number|string}
     */
    '++': v => {
      let num = v[0]

      if (v instanceof String) {
        num = parseInt(v[0])
        num++

        return num.toString()
      }

      return ++num
    },
    /**
     * Decrement operator
     * @private
     * @param {number[]} v
     * @returns {number|string}
     */
    '--': v => {
      let num = v[0]

      if (v instanceof String) {
        num = parseInt(v[0])
        num--

        return num.toString()
      }

      return --num
    },
    /**
     * Negation operator
     * @private
     * @param {number[]} v
     * @returns {number}
     */
    '-': v => v[0] - v[1],
    /**
     * Plus operator
     * @private
     * @param {number[]} v
     * @returns {number}
     */
    '+': v => v[0] + v[1],
    /**
     * Multiplication operator
     * @private
     * @param {number[]} v
     * @returns {number}
     */
    '*': v => v[0] * v[1],
    /**
     * Exponentiation operator
     * @private
     * @param {number[]} v
     * @returns {number}
     */
    '**': v => v[0] ** v[1],
    /**
     * Boolean value
     * @private
     * @param {OperatorValues} v
     * @returns {boolean}
     */
    '!!': v => Boolean(v[0]),
    /**
     * Check if value is within an string or array
     * @private
     * @param {(string|Array)} v
     * @return {boolean}
     */
    '~': v => v[0].includes(v[1])
  }

  defineActionSchema({
    compare: {
      name: 'Compare',
      description: 'Compare two or more values',
      schema: [
        {
          type: 'array',
          items: {
            anyOf: [
              {
                type: 'string'
              },
              {
                type: 'number'
              }
            ]
          }
        }
      ]
    },
    eval: {
      name: 'Evaluate',
      description: 'Evaluate two values',
      schema: [
        {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            values: {
              type: 'array',
              items: {
                oneOf: [
                  {
                    type: 'string'
                  },
                  {
                    type: 'number'
                  }
                ]
              }
            }
          }
        }
      ]
    }
  })

  defineActions({
    /**
     * Compare two or more values
     * @param {*[]} values - Contains two values or more values which are compared
     * @example
     * const andValues = ['1', '&&', 1]
     */
    compare (values) {
      let result = false

      for (let i = 0; i < values.length; i++) {
        const value = values[i]

        if (value === '&&') {
          if ((values[i - 1] && values[i + 1])) {
            result = true
          } else {
            break
          }
        }

        if (value === '||') {
          if ((values[i - 1] || values[i + 1])) {
            result = true
          } else {
            break
          }
        }
      }

      return result
    },
    /**
     * Evaluate two values
     * @param {Object} eval - The Object containing the data to evaluate two values
     * @param {string} eval.name - Operator name
     * @param {OperatorValues} eval.values - Contains two values to be evaluated
     */
    eval ({ name, values }) {
      if (operators[name]) {
        return operators[name](values)
      } else {
        throw new Error('No operator found: ' + name)
      }
    }
  })
})

const operatorEval = operator.actions.eval
const operatorCompare = operator.actions.compare

export {
  operatorEval,
  operatorCompare
}

export default operator
