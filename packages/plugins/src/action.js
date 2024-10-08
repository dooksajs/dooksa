import createPlugin from '@dooksa/create-plugin'
import { fetchById } from './fetch.js'
import { dataGetValue, dataSetValue } from './data.js'
import { operatorCompare, operatorEval } from './operator.js'
import { generateId } from '@dooksa/utils'

/**
 * @typedef {import('../../types.js').SetDataOptions} SetDataOptions
 * @typedef {import('../../types.js').GetDataQuery} GetDataQuery
 * @typedef {import('../../types.js').DataSchema} DataSchema
 * @typedef {import('../../types.js').DataWhere} DataWhere
 */

/**
 * @typedef {string|string[]} GetDataValue
 */

const dataTypes = {
  object: () => ({}),
  array: () => ([])
}
let $action = (name, param, context, callback) => {}

/**
 * Get result value
 * @private
 * @param {*} value
 * @param {GetDataValue} [query] - Request to return a specific key value, dot notations are permitted
 * @returns {*[]|*}
 */
function getValue (value, query) {
  if (query == null) {
    return value
  }

  // get single by dot notation
  if (typeof query === 'string') {
    const keys = query.split('.')

    if (keys.length === 1) {
      return value[keys[0]]
    }

    let result = value

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (result != null) {
        result = result[key]
      } else {
        return
      }
    }

    return result
  }

  if (typeof query === 'number') {
    return value[query]
  }

  let result = value

  // get value by array
  for (let i = 0; i < query.length; i++) {
    const keys = query[i].split('.')

    if (query.length === 1 && keys.length === 1) {
      return value[keys[0]]
    }


    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (Object.hasOwnProperty.call(result, key)) {
        result[key]
      } else {
        /** @TODO Create custom ReferenceError */
        throw new Error('Action get value was not defined: ' + key)
      }
    }
  }

  return result
}

function getBlockValue (id, blockValues) {
  let value = blockValues[id]

  if (!blockValues.hasOwnProperty(id)) {
    const blockData = dataGetValue({ name: 'action/blocks', id })

    if (blockData.isEmpty) {
      throw new Error('Action: block could not be found: ' + id)
    }

    value = blockData.item
  }

  return value
}

function getBlockValueByKey (block, context, payload, blockValues) {
  if (block.hasOwnProperty('blockValues')) {
    return getBlockValues(block, context, payload, blockValues)
  }

  const result = {
    key: block.key,
    value: block.value
  }

  if (block.hasOwnProperty('blockValue')) {
    result.value = getBlockValue(block.blockValue, blockValues)
  }

  return result
}

function getBlockValues (block, context, payload, blockValues) {
  let value = dataTypes[block.dataType]()
  const blocks = block.blockValues

  for (let i = 0; i < blocks.length; i++) {
    const id = blocks[i]
    const block = dataGetValue({ name: 'action/blocks', id })

    if (block.isEmpty) {
      throw new Error('Action: block could not be found: ' + id)
    }

    const result = getBlockValueByKey(block.item, context, payload, blockValues)

    if (result.key) {
      value[result.key] = result.value
    } else {
      value = result.value
    }

    blockValues[id] = value
  }

  return {
    key: block.key,
    value
  }
}

function processSequence (sequence, context, payload, blockValues = {}, callback, startProcess) {
  const blockProcess = []
  let blockProcessIndex = 0

  for (let i = 0; i < sequence.length; i++) {
    const blockSequenceId = sequence[i]
    const blockSequence = dataGetValue({ name: 'action/blockSequences', id: blockSequenceId }).item

    for (let i = 0; i < blockSequence.length; i++) {
      const id = blockSequence[i]
      const block = dataGetValue({ name: 'action/blocks', id })

      if (block.isEmpty) {
        throw new Error('Action: block could not be found: ' + id )
      }

      const item = block.item

      // prepare block method
      if (item.method) {
        blockProcess.push(() => {
          const blockResult = getBlockValueByKey(block.item, context, payload, blockValues)

          $action(item.method, blockResult.value, { context, payload, blockValues }, {
            onSuccess: (result => {
              const nextProcess = blockProcess[++blockProcessIndex]
              blockValues[id] = result

              if (nextProcess) {
                return nextProcess()
              }

              callback()
            }),
            onError: (error) => {
              /**
               * @TODO Console error
               * Until browser support cause @link https://caniuse.com/mdn-javascript_builtins_error_cause_displayed_in_console
               */
              if (navigator.userAgent.indexOf('Firefox') === -1) {
                console.error(error)
              }

              throw new Error('Broken action block', { cause: error })
            }
          })
        })
      } else if (item.ifElse) {
        blockProcess.push(() => {
          const blockResult = getBlockValueByKey(block.item, context, payload, blockValues)
          const processItems = ifElse(blockResult.value, callback, { context, payload, blockValues })

          // append new process items
          for (let index = 0; index < processItems.length; index++) {
            blockProcess.push(processItems[index])
          }

          const nextProcess = blockProcess[++blockProcessIndex]

          if (nextProcess) {
            return nextProcess()
          }

          callback()
        })
      }
    }
  }

  const nextProcess = blockProcess[blockProcessIndex]

  if (startProcess && typeof nextProcess === 'function') {
    nextProcess()
  }

  return blockProcess
}

/**
 * Conditional statement
 * @param {Object} props
 * @param {Object} props.branch
 * @param {Object[]} props.branch.if
 * @param {'=='|'!='|'>'|'>='|'<'|'<='|'!'|'%'|'++'|'--'|'-'|'+'|'*'|'**'|'!!'|'~'} props.branch.if[].op
 * @param {string|number} props.branch.if[].from
 * @param {string|number} props.branch.if[].to
 * @param {'&&'|'||'} props.branch.if[].andOr
 * @param {number[]} props.branch.then
 * @param {number[]} props.branch.else
 * @param {*} props.context
 * @param {*} props.payload
 * @param {*} props.blockValues
 */
function ifElse (branch, callback, { context, payload, blockValues }) {
  let isTruthy = false

  if (branch.if.length > 1) {
    const compareValues = []
    /**
     * @type {Object}
     * @property {*} value_1
     * @property {*} value_2
     * @property {'&&'|'||'} op
     */
    let compareItem = {}

    for (let i = 0; i < branch.if.length; i++) {
      const item = branch.if[i]
      const value = operatorEval({
        name: item.op,
        values: [item.from, item.to]
      })

      if (!compareItem.value_1) {
        compareItem.value_1 = value
      }

      if (!compareItem.op) {
        compareItem.op = item.andOr
      }

      if (!compareItem.value_2) {
        if (!compareItem.op) {
          throw new Error('Condition expects an operator')
        }

        compareItem.value_2 = value
        compareValues.push(compareItem)
        compareItem = {}
      }
    }

    isTruthy = operatorCompare(compareValues)
  } else {
    const item = branch.if[0]

    isTruthy = operatorEval({
      name: item.op,
      values: [item.from, item.to]
    })
  }

  if (isTruthy) {
    return processSequence(branch.then, context, payload, blockValues, callback)
  }

  return processSequence(branch.else, context, payload, blockValues, callback)
}

const action = createPlugin('action', {
  models: {
    blocks: {
      type: 'collection',
      items: {
        type: 'object',
        properties: {
          ifElse: {
            type: 'boolean'
          },
          method: {
            type: 'string'
          },
          dataType: {
            type: 'string'
          },
          blockValue: {
            type: 'string',
            relation: 'action/blocks'
          },
          blockValues: {
            type: 'array',
            items: {
              type: 'string',
              relation: 'action/blocks'
            }
          },
          blockSequence: {
            type: 'string',
            relation: 'action/blockSequences'
          },
          key: {
            type: 'string'
          }
        }
      }
    },
    blockSequences: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'string',
          relation: 'action/blocks'
        }
      }
    },
    dependencies: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'string',
          relation: 'action/items'
        },
        uniqueItems: true
      }
    },
    sequences: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'string',
          relation: 'action/blockSequences'
        }
      }
    },
    values: {
      type: 'collection',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            relation: 'action/blocks'
          }
        }
      }
    },
    valueGroups: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'string',
          relation: 'action/values'
        },
        uniqueItems: true
      }
    },
    templates: {
      type: 'collection',
      items: {
        type: 'object',
        properties: {
          blocks: {
            type: 'object',
            properties: {
              ifElse: {
                type: 'boolean'
              },
              method: {
                type: 'string'
              },
              dataType: {
                type: 'string'
              },
              blockValue: {
                type: 'string',
                relation: 'action/blocks'
              },
              blockValues: {
                type: 'array',
                items: {
                  type: 'string',
                  relation: 'action/blocks'
                }
              },
              key: {
                type: 'string'
              }
            }
          },
          blockSequences: {
            type: 'object'
          },
          sequences: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  metadata: {
    title: 'Action',
    description: 'Dooksa runtime interpreter',
    icon: 'mdi:code-braces-box'
  },
  actions: {
    dispatch: {
      metadata: {
        title: 'Dispatch',
        description: 'Execute an action',
        icon: 'mdi:play-box-multiple'
      },
      /**
       * @param {Object} param
       * @param {string} param.id
       * @param {Object} param.context
       * @param {Object} param.payload
       * @param {boolean} [param.clearBlockValues]
       * @param {Object} [actionContext]
       * @param {Object} [actionContext.blockValues]
       */
      method ({ id, context, payload, clearBlockValues }, actionContext ) {
        if (clearBlockValues) {
          actionContext.blockValues = {}
        }

        return new Promise((resolve, reject) => {
          const sequence = dataGetValue({
            name: 'action/sequences',
            id,
            options: {
              expand: true
            }
          })

          // attempt to fetch action from backend
          if (sequence.isEmpty) {
            return fetchById({
              collection: 'action/sequence',
              id: [id],
              expand: true
            })
              .then(data => {
                if (data.isEmpty) {
                  return reject(new Error('No action found: ' + id))
                }

                this.dispatch({ id, context, payload }, actionContext)
                  .then(result => resolve(result))
                  .then(error => reject(error))
              })
              .catch(error => reject(error))
          }

          try {
            processSequence(sequence.item, context, payload, actionContext.blockValues, resolve, true)
          } catch (error) {
            reject(error)
          }
        })
      }
    },
    getActionValue: {
      metadata: {
        title: 'Get variable',
        description: 'Retrieve variable value',
        icon: 'mdi:application-variable'
      },
      /**
       * Get action variable value
       * @param {Object} props
       * @param {string} props.id
       * @param {string} [props.prefixId]
       * @param {string} [props.suffixId]
       * @param {string} props.query
       */
      method (props) {
        const value = dataGetValue({
          name: 'action/values',
          id: props.id
        })

        if (!value.isEmpty) {
          let query = props.query

          if (props.prefixId) {
            query = props.prefixId + query
          }

          if (props.suffixId) {
            const splitQuery = query.split('.')

            query = splitQuery[0] + props.suffixId

            for (let i = 1; i < splitQuery.length; i++) {
              query = query + query
            }
          }

          return getValue(value.item, query)
        }
      }
    },
    getBlockValue: {
      metadata: {
        title: 'Get action block value',
        description: 'Get value from returned action block value',
        icon: 'mdi:variable-box'
      },
      /**
       * Get block value
       * @param {Object} props
       * @param {*} props.value
       * @param {GetDataValue} props.query
       */
      method (props) {
        if (props.value) {
          return getValue(props.value, props.query)
        }
      }
    },
    getContextValue: {
      metadata: {
        title: 'Get context value',
        description: 'Get value from current context values',
        icon: 'mdi:variable'
      },
      /**
       * Get context value
       * @param {GetDataValue} props
       * @param {Object} ctx
       */
      method (props, { context }) {
        return getValue(context, props)
      }
    },
    getPayloadValue: {
      metadata: {
        title: 'Get payload value',
        description: 'Get data from current event payload',
        icon: 'mdi:input'
      },
      /**
       * Get payload value
       * @param {GetDataValue} props
       */
      method (props, { payload }) {
        return getValue(payload, props)
      }
    },
    ifElse: {
      metadata: {
        title: 'Condition',
        description: 'The if...else statement executes a action',
        icon: 'mdi:source-branch'
      },
      method: ifElse
    },
    /**
     * @param {GetDataQuery} props
     * @returns {import('./data.js').DataValue}
     */
    getDataValue (props) {
      return dataGetValue(props).item
    },
    setActionValue: {
      metadata: {
        title: 'Get sequence value',
        description: 'Get value from current sequence action',
        icon: 'mdi:format-list-numbered'
      },
      method (props, { context }) {
        const values = {}
        const id = props.id

        for (let i = 0; i < props.values.length; i++) {
          const item = props.values[i]
          let valueId = item.id || generateId()

          if (item.prefixId) {
            valueId = item.prefixId + valueId
          }

          if (item.suffixId) {
            valueId = valueId + item.suffixId
          }

          values[valueId] = item.value
        }

        const groupId = props.groupId || context.groupId

        dataSetValue({
          name: 'action/valueBelongsToGroup',
          value: groupId,
          options: {
            id: id
          }
        })

        dataSetValue({
          name: 'action/valueGroups',
          value: id,
          options: {
            id: groupId,
            update: {
              method: 'push'
            }
          }
        })

        return dataSetValue({
          name: 'action/values',
          value: values,
          options: {
            id,
            merge: true
          }
        })
      }
    }
  },
  setup ({ action }) {
    $action = action
  }
})

const actionDispatch = action.actions.dispatch

export {
  action,
  actionDispatch
}

export default action
