import { getNodeValue } from '@dooksa/parse-template'

/**
 * @typedef {string} dsViewId - dsView node id
 * @example <caption>Example of string value</caption>
 * "_v53KKewgkeUQuwDXUnlArp_0000"
 */

/**
 * @namespace dsView
 */
export default {
  name: 'dsView',
  version: 1,
  data: {
    rootViewId: {
      default: 'rootElement',
      schema: {
        type: 'string'
      }
    },
    attributes: {
      default: {},
      schema: {
        type: 'collection',
        items: {
          type: 'object'
        }
      }
    },
    content: {
      default: {},
      schema: {
        type: 'collection',
        items: {
          type: 'string',
          relation: 'dsContent/items'
        }
      }
    },
    handlers: {
      default: {},
      schema: {
        type: 'collection',
        uniqueItems: true,
        items: {
          type: 'array'
        }
      }
    },
    items: {
      default: {},
      schema: {
        type: 'collection',
        mutable: true,
        items: {
          type: 'node'
        }
      }
    },
    itemParent: {
      default: {},
      schema: {
        type: 'collection',
        items: {
          type: 'string'
        }
      }
    }
  },
  /**
   * Setup plugin
   * @param {Object} options
   * @param {string} options.rootElementId - Root element id
   */
  setup ({ rootElementId = 'root' }) {
    // get root element from the DOM
    const rootElement = document.getElementById(rootElementId)

    if (!rootElement) {
      throw new Error('Could not find root element: ', rootElement)
    }

    // Set root element
    const dsViewId = this.createNode({
      dsViewId: 'rootElement',
      dsComponentId: '43f4f4c34d66e648'
    })

    this.$setDataValue('dsView/rootViewId', {
      source: dsViewId
    })

    // get root element
    const dsView = this.$getDataValue('dsView/items', {
      id: dsViewId
    })

    // replace root element with new app element
    rootElement.parentElement.replaceChild(dsView.item, rootElement)
  },
  /** @lends dsView.prototype */
  methods: {
    /**
     * Adds a node to the end of the list of children of a specified parent node
     * @param {Object} item
     * @param {dsViewId} item.dsViewId - Child dsView node id
     * @param {dsViewId} item.dsViewParentId - Parent dsView node id
     */
    append ({ dsViewId, dsViewParentId }) {
      const parentView = this.$getDataValue('dsView/items', {
        id: dsViewParentId
      })
      const childView = this.$getDataValue('dsView/items', {
        id: dsViewId
      })

      parentView.item.appendChild(childView.item)

      this.$emit('dsView/mount', {
        id: dsViewId,
        payload: {
          dsViewParentId,
          dsViewId
        }
      })

      this.$addDataListener('dsView/items', {
        on: 'delete',
        id: dsViewId,
        refId: dsViewId,
        listener: () => {
          this.$deleteDataValue('dsView/items', {
            id: dsViewId
          })
        }
      })

      // update parents
      this.$setDataValue('dsView/itemParent', {
        source: dsViewParentId,
        typeCheck: false,
        options: {
          id: dsViewId
        }
      })
    },
    /**
     * Creates node
     * @param {Object} item
     * @param {dsComponent} item.dsComponentId - Component id
     * @param {string} item.dsWidgetSectionId - Section id from dsWidget
     * @param {string} item.dsWidgetInstanceId - Instance id from dsWidget
     */
    createNode ({
      dsViewId,
      dsComponentId,
      dsWidgetSectionId,
      dsWidgetInstanceId
    }) {
      let dsComponent = this.$getDataValue('dsComponent/items', {
        id: dsComponentId
      })

      if (dsComponent.isEmpty) {
        return
      }

      dsComponent = dsComponent.item

      dsViewId = dsViewId || this.$method('dsData/generateId')
      let element

      if (dsComponent.id === 'text') {
        element = document.createTextNode('')
      } else {
        element = document.createElement(dsComponent.id)
      }
      // ISSUE: [DS-758] Remove dev code during build (using rollup)
      // Add view node id to the node
      if (this.isDev) {
        element.id = dsViewId
      }

      element.dsViewId = dsViewId

      this.$setDataValue('dsView/items', {
        source: element,
        typeCheck: false,
        options: {
          id: dsViewId
        }
      })

      if (dsComponent.attributes) {
        this._setAttributes(element, dsComponent.attributes)
      }

      const component = this.$component(dsComponent.id)

      // ISSUE: [DS-889] Only add events if in edit mode
      if (component && component.events) {
        for (let i = 0; i < component.events.length; i++) {
          const name = component.events[i]

          const handler = (event) => {
            event.preventDefault()
            const dsContentId = this.$getDataValue('dsView/content', {
              id: dsViewId
            })

            this.$emit(name, {
              id: dsViewId,
              payload: {
                dsViewId,
                dsContentId: dsContentId.item,
                dsWidgetInstanceId,
                dsWidgetSectionId,
                event
              }
            })
          }

          element.addEventListener(name, handler)

          this.$setDataValue('dsView/handlers', {
            source: handler,
            options: {
              id: dsViewId,
              source: {
                push: true
              }
            }
          })
        }
      }

      return dsViewId
    },
    /**
     * Get value from node item
     * @param {dsViewId} dsViewId - dsView node id
     * @returns {string|Object} - Either a string or Object based on the components getter
     */
    getValue (dsViewId) {
      const dsView = this.$getDataValue('dsView/items', {
        id: dsViewId
      })

      if (dsView.isEmpty) {
        throw Error('No view item found')
      }

      const nodeName = dsView.item.nodeName.toLowerCase()
      const getters = this.$componentGetters[nodeName]

      if (getters) {
        const node = this.$component(nodeName)
        let value = {}

        if (node.nodeName === '#text') {
          value = getNodeValue(getters[0].type, node, getters[0].value)
        } else {
        // get node value
        for (let i = 0; i < getters.length; i++) {
          const getter = getters[i]
            const result = getNodeValue(getter.type, node, getter.value)

            value[result.key] = result.value
          }
        }

        return value
      }
    },
    /**
     * Remove node
     * @param {dsViewId} dsViewId - dsView node id
     */
    remove (dsViewId) {
      const dsView = this.$getDataValue('dsView/items', {
        id: dsViewId
      })

      if (!dsView.isEmpty) {
        // remove content attachment
        this._unmount(dsViewId)
        this._removeHanders(dsViewId)

        dsView.item.remove()
      }
    },
    /**
     * Remove all child nodes from select node
     * @param {dsViewId} dsViewId - dsView node id
     */
    removeChildren (dsViewId) {
      const dsView = this.$getDataValue('dsView/items', {
        id: dsViewId
      })

      if (!dsView.isEmpty && dsView.item.lastChild) {
        const node = dsView.item

        while (node.lastChild) {
          this._unmount(node.lastChild.dsViewId)
          this._removeHanders(node.lastChild.dsViewId)

          node.removeChild(node.lastChild)
        }

        this.$emit('dsView/unmount', {
          id: dsViewId,
          payload: { dsViewId }
        })
      }
    },
    /**
     * Replaces a child node within the given (parent) node
     * @param {Object} node
     * @param {dsViewId} node.dsViewParentId - Parent dsView id
     * @param {dsViewId} node.dsViewId - Child dsView id
     * @param {dsViewId} node.dsViewIdPrev - Replacement child dsView id
     * @param {number} node.childIndex - Index of replacement child
     */
    replace ({ dsViewParentId, dsViewId, dsViewIdPrev, childIndex }) {
      const dsViewChild = this.$getDataValue('dsView/items', {
        id: dsViewId
      })

      let dsViewPrevChild, dsViewParent

      if (dsViewIdPrev) {
        dsViewPrevChild = this.$getDataValue('dsView/items', {
          id: dsViewIdPrev
        })
        dsViewParent = dsViewPrevChild.item.parentElement
      } else if (!isNaN(childIndex)) {
        dsViewParent = this.$getDataValue('dsView/items', {
          id: dsViewParentId
        })

        dsViewPrevChild = dsViewParent.item.childNodes[childIndex]
      }

      // replace old child with new child
      if (dsViewPrevChild) {
        dsViewPrevChild.item.replaceWidth(dsViewChild.item)

        // emit old child unmount
        this._unmount(dsViewPrevChild.item.dsViewId)

        // emit new child mount
        this.$emit('dsView/mount', {
          id: dsViewId,
          payload: { dsViewId }
        })

        // update parents
        this.$setDataValue('dsView/itemParent', {
          source: dsViewParent.item.dsViewId,
          options: {
            id: dsViewId
          }
        })
      }
    },
    /**
     * Update node value
     * @param {Object} node
     * @param {dsViewId} node.dsViewId - dsView node id
     * @param {dsContentValue} node.value - dsContent value
     * @param {dsContentLanguage} node.language - dsContent language code
     */
    updateValue ({ dsViewId, language }) {
      const dsView = this.$getDataValue('dsView/items', {
        id: dsViewId
      })

      if (dsView.isEmpty) {
        throw Error('No view item found')
      }

      let dsContentId = this.$getDataValue('dsView/content', {
        id: dsViewId
      })

      if (dsContentId.isEmpty) {
        throw Error('No content attached to view item')
      }

      dsContentId = dsContentId.item

      let dsContent = this.$getDataValue('dsContent/items', {
        id: dsContentId
      })

      // exit if content is empty
      if (dsContent.isEmpty) {
        return
      }

      dsContent = dsContent.item

      const dsContentType = this.$getDataValue('dsContent/type', {
        id: dsContentId
      })
      const node = dsView.item
      const nodeName = node.nodeName.toLowerCase()

      // ISSUE: [DS-760] move setters to general actions
      if (dsContentType.item.name === 'text') {
        if (dsContent.token) {
          return this.$method('dsToken/textContent', {
            dsViewId,
            text: dsContent.value,
            updateText: (value) => {
              node.textContent = value
            }
          })
        }

        node.textContent = dsContent.value

        return
      }

      this.$component(nodeName)
      const setters = this.$componentSetters[nodeName]

      if (setters) {
        for (let i = 0; i < setters.length; i++) {
          const setter = setters[i]

          this[`_setValueBy/${setter.type}`](node, setter.value, dsContent)
        }
      }
    },
    /**
     * Remove event handlers
     * @param {dsViewId} id - handler ref id
     * @private
     */
    _removeHanders (dsViewId) {
      delete this.handlers[dsViewId]
    },
    /**
     * Set attributes to element
     * @param {dsViewId} dsViewId - dsView node id
     * @param {Object.<string, string>} attributes
     * @private
     */
    _setAttributes (element, attributes) {
      for (let i = 0; i < attributes.length; i++) {
        const [name, value] = attributes[i]

        element.setAttribute(name, value)
      }
    },
    /**
     * Set event handler
     * @param {string} dsViewId - handler ref id
     * @param {function} handler - handler for an event
     * @private
     */
    _setHandler (dsViewId, handler) {
      if (this.handlers[dsViewId]) {
        this.handlers[dsViewId].push(handler)
      } else {
        this.handlers[dsViewId] = [handler]
      }
    },
    /**
     * Set element value using a attribute
     * @param {Object} node - Text or Element node
     * @param {dsComponentSet} setter - Setters used to update the elements value
     * @param {(string|Object)} content - dsContent object
     * @private
     */
    '_setValueBy/attribute' (node, setter, content) {
      if (typeof setter === 'string') {
        return node.setAttribute(setter, content.value)
      }

      node.setAttribute(setter.name, content[setter.key])
    },
    /**
     * Set element value using a attribute
     * @param {Object} node - Text or Element node
     * @param {dsComponentSet} setter - Setters used to update the elements value
     * @param {(string|Object)} content - dsContent object
     * @private
     */
    '_setValueBy/setter' (node, setter, content) {
      if (typeof setter === 'string') {
        if (node.__lookupSetter__(setter)) {
          node[setter] = content.value
        }
      } else if (node.__lookupSetter__(setter.name)) {
        node[setter.name] = content[setter.key]
      }
    },
    /**
     * Unmount node
     * @param {dsViewId} dsViewId - dsView node id
     * @private
     */
    _unmount (dsViewId) {
      this.$emit('dsView/unmount', {
        id: dsViewId,
        payload: { dsViewId }
      })

      this.$removeDataValue('dsView/itemParent', {
        id: dsViewId
      })
    }
  }
}
