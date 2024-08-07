import createPlugin from '@dooksa/create-plugin'
import {
  dataUnsafeSetValue,
  dataGetValue,
  dataAddListener,
  dataSetValue,
  dataDeleteListener,
  dataDeleteValue
} from './data.js'
import { eventEmit } from './event.js'
import { componentOptions } from '@dooksa/create-component'
import { removeAffix } from './utils/createDataValue.js'
import { generateId } from '@dooksa/utils'

/**
 * @typedef {import('@dooksa/create-component').Component} Component
 * @typedef {import('@dooksa/create-component').ComponentEvent} ComponentEvent
 * @typedef {import('@dooksa/create-component').ComponentInstance} ComponentInstance
 */

/**
 * @typedef {Object} ComponentItem
 * @property {string} [id] - Component item id
 * @property {string} [rootId] - Root component item id
 * @property {string} [parentId] - Parent component item id
 * @property {string} [groupId] - Component group id
 * @property {ComponentInstance} [component]
 * @property {Component} [template]
 * @property {Node} [node] - Component node
 * @property {Object} [content]
 * @property {ComponentEvent[]} [events]
 * @property {ComponentItem[]} [children]
 */

/**
 * @param {string} name
 * @returns {Component}
 */
let $component = (name) => ({
  id: ''
})

function getContent (node, content) {
  const result = {}

  for (let i = 0; i < content.length; i++) {
    const item = content[i]

    if (item.nodePropertyName) {
      result[item.name] = node[item.nodePropertyName]
    }
  }

  return result
}

function setContent (node, content, values) {
  for (let i = 0; i < content.length; i++) {
    const item = content[i]

    if (item.nodePropertyName) {
      node[item.nodePropertyName] = values[item.name]
    }
  }
}

/**
 * Set properties to element
 * @param {HTMLElement} element - view node id
 * @param {Object[]} properties
 * @private
 */
function setProperties (element, properties = []) {
  for (let i = 0; i < properties.length; i++) {
    const { name, value } = properties[i]

    if (element[name] != null) {
      element[name] = value
    } else {
      element.setAttribute(name, value)
    }
  }
}

/**
 * @typedef {Object} LazyLoad
 * @property {}
 */

/**
 * @template T
 * @param {T} item
 * @param {Object} template
 * @param {function} cb
 * @returns {Promise<T>}
 */
function lazyLoad (item, template, cb) {
  return new Promise((resolve, reject) => {
    template.component()
      .then(() => {
        template.isLoaded = true

        resolve(cb(item))
      })
      .catch(error => reject(error))
  })
}

/**
 * Update content attached to component
 * @param {string} id - component id
 * @param {string} contentId - content id
 * @param {string} contentNoAffixId - content id without language suffix
 * @param {Node} node - Node attached to component
 * @param {Object[]} templateContent - Component content template
 */
function contentListeners (id, contentId, contentNoAffixId, node, templateContent) {
  // update element content if content data changes
  let handlerId = dataAddListener({
    name: 'content/items',
    on: 'update',
    id: contentId,
    handler: (data) => {
      setContent(node, templateContent, data.item)
    }
  })

  dataAddListener({
    name: 'metadata/currentLanguage',
    on: 'update',
    handler: (data) => {
      dataDeleteListener({
        name: 'content/items',
        on: 'update',
        id: contentId,
        handlerId
      })

      // change content lang
      contentId = contentNoAffixId + data.item
      const content = dataGetValue({ name: 'content/items', id })

      if (!content.isEmpty) {
        setContent(node, templateContent, content.item)
      }

      handlerId = dataAddListener({
        name: 'content/items',
        on: 'update',
        id: contentId,
        handler: (data) => {
          setContent(node, templateContent, data.item)
        }
      })
    }
  })

  // update element content if component content is changed
  dataAddListener({
    name: 'component/content',
    on: 'update',
    id,
    handler: (data) => {
      const content = dataGetValue({ name: 'content/items', id: data.item })

      setContent(node, templateContent, content.item)
    }
  })
}

function createNode (id, item) {
  const template = $component(item.id)
  let node

  if (!template.isLoaded) {
    return lazyLoad({
      id,
      item
    }, template, createNode)
  }

  // Custom element constructor
  if (typeof template.initialize === 'function') {
    node = template.initialize()
  } else {
    // create element
    node = document.createElement(template.tag)
  }

  node.dooksaComponentId = id
  dataUnsafeSetValue({ name: 'component/nodes', value: node, options: { id } })

  const properties = dataGetValue({ name: 'component/properties', id }).item || template.properties

  if (!properties) {
    setProperties(node, properties)

    dataAddListener({
      name: 'component/properties',
      on: 'update',
      id,
      handler: (options) => {
        setProperties(node, options.item)
      }
    })
  }

  if (template.options) {
    dataAddListener({
      name: 'component/options',
      on: 'update',
      id,
      handler: (options) => {
        const properties = componentOptions(options.item, template.options, template.properties)

        dataSetValue({ name: 'component/properties', value: properties, options: { id } })
      }
    })
  }

  const content = dataGetValue({
    name: 'component/content',
    id,
    options: { expand: true }
  })
  let contentId
  if (!content.isEmpty) {
    const contentData = content.extend[0]
    const template = $component(item.id)

    contentId = removeAffix(contentData.id)
    setContent(node, template.content, contentData.item)
    contentListeners(id, contentData.id, contentId, node, template.content)
  }

  const children = dataGetValue({ name: 'component/children', id, options: { expand: true } })
  const rootId = dataGetValue({ name: 'component/roots', id }).item
  const groupId = dataGetValue({ name: 'component/belongsToGroup', id }).item
  const parentId = dataGetValue({ name: 'component/parents', id }).item
  const event = dataGetValue({ name: 'component/events', id })
  const childNodes = []
  let childIsLazy = false
  let hasCreateEvent = false

  if (!event.isEmpty) {
    const events = event.item
    const eventTypes = template.eventTypes || {}
    const hasEvent = {}

    for (let i = 0; i < events.length; i++) {
      const { on, actionId } = events[i]
      const eventData = dataSetValue({
        name: 'event/listeners',
        value: actionId,
        options: {
          id: 'component/' + on + id,
          update: {
            method: 'push'
          }
        }
      })

      if (on === 'component/create') {
        hasCreateEvent = true
      }

      dataSetValue({
        name: 'component/events',
        value: eventData.id,
        options: {
          id,
          update: {
            method: 'pull'
          }
        }
      })

      if (eventTypes[on] && !hasEvent[on]) {
        const nodeEvent = on.split('/')

        if (nodeEvent[0] === 'node') {
          hasEvent[on] = true
          const handler = (payload) => {
            // fire node events
            eventEmit({
              name: on,
              id,
              context: {
                id,
                rootId,
                parentId,
                groupId
              },
              payload
            })
          }

          node.addEventListener(nodeEvent[1], handler)

          // store handler
          dataUnsafeSetValue({ name: 'event/handlers', value: handler, options: { id } })
          // handle removal
          dataAddListener({
            name: 'event/handlers',
            on: 'delete',
            id,
            handler () {
              node.removeEventListener(on, handler)
            }
          })
        }
      }
    }

    // fire mount event
    eventEmit({
      name: 'component/mount',
      id,
      context: {
        id,
        rootId,
        contentId,
        parentId,
        groupId
      }
    })
  }

  if (!children.isEmpty) {
    for (let i = 0; i < children.expand.length; i++) {
      const component = children.expand[i]
      let childNode = dataGetValue({ name: 'component/nodes', id: component.id })

      if (component.item.isTemplate) {
        childNode = createTemplate({
          id: component.id,
          template: $component(component.item.id),
          parentId: id,
          rootId: component.id,
          groupId: component.id
        })

        childIsLazy = (childNode instanceof Promise)
      }

      childNodes.push(childNode)
    }

    if (childIsLazy) {
      Promise.all(childNodes)
        .then(result => {
          for (let i = 0; i < result.length; i++) {
            node.appendChild(result[i].item)
          }

          if (hasCreateEvent) {
            // fire created event
            eventEmit({
              name: 'component/create',
              id,
              context: {
                id,
                rootId,
                contentId,
                parentId,
                groupId
              }
            })
          }
        })
        .catch(error => console.error(error))
    } else {
      for (let i = 0; i < childNodes.length; i++) {
        node.appendChild(childNodes[i].item)
      }
    }
  }

  if (hasCreateEvent && !childIsLazy) {
    // fire created event
    eventEmit({
      name: 'component/create',
      id,
      context: {
        id,
        rootId,
        contentId,
        parentId,
        groupId
      }
    })
  }

  return {
    id,
    item: node
  }
}

/**
 * isTemporary is for components that are not intended to be saved in page state (usually used for dynamic content)
 */

/**
 * Create node from template
 * @param {Object} param
 * @param {string} [param.id],
 * @param {Component} param.template
 * @param {string} param.parentId
 * @param {string} [param.rootId]
 * @param {string} [param.groupId]
 */
function createTemplate ({
  id = generateId(),
  template,
  parentId,
  rootId = id,
  groupId = id
}) {
  const component = {
    id: template.id,
    type: template.type
  }
  const options = { id }
  const properties = {}
  let node
  let contentId

  if (!template.isLoaded) {
    return lazyLoad({
      id,
      template,
      parentId,
      rootId,
      groupId
    }, template, createTemplate)
  }

  // Custom element constructor
  if (typeof template.initialize === 'function') {
    node = template.initialize()
  } else {
    // create element
    node = document.createElement(template.tag)
  }

  // store node
  node.dooksaComponentId = id
  dataUnsafeSetValue({ name: 'component/nodes', value: node, options })

  // set core component values
  dataSetValue({ name: 'component/roots', value: rootId, options })
  dataSetValue({ name: 'component/parents', value: parentId, options })
  dataSetValue({ name: 'component/items', value: component, options })

  // set group
  dataSetValue({
    name: 'component/groups',
    value: id,
    options: {
      id: groupId,
      update: {
        method: 'push'
      }
    }
  })
  dataSetValue({ name: 'component/belongsToGroup', value: groupId, options })

  // set properties to node
  if (template.properties) {
    for (let i = 0; i < template.properties.length; i++) {
      const { name, value } = template.properties[i]

      // prepare default content values
      properties[name] = value
    }

    setProperties(node, template.properties)

    dataAddListener({
      name: 'component/properties',
      on: 'update',
      id,
      handler: (options) => {
        setProperties(node, options.item)
      }
    })
  }

  // set content
  if (template.content) {
    const content = {}
    const nodeValues = getContent(node, template.content)

    for (let i = 0; i < template.content.length; i++) {
      const data = template.content[i]
      let contentValue = properties[data.nodePropertyName]

      if (contentValue == null) {
        contentValue = nodeValues[data.nodePropertyName]
      }

      // add default value from props
      content[data.name] = contentValue
    }

    const contentData = dataSetValue({ name: 'content/items', value: content })
    contentId = removeAffix(contentData.id)

    dataSetValue({
      name: 'content/languages',
      value: contentData.id,
      options: {
        id: contentId,
        update: {
          method: 'push'
        }
      }
    })
    dataSetValue({
      name: 'content/components',
      value: id,
      options: {
        id: contentId,
        update: {
          method: 'push'
        }
      }
    })
    dataSetValue({
      name: 'component/content',
      value: contentId,
      options
    })

    setContent(node, template.content, content)
    contentListeners(id, contentData.id, removeAffix(contentData.id), node, template.content)
  }

  if (template.options) {
    dataAddListener({
      name: 'component/options',
      on: 'update',
      id,
      handler: (options) => {
        const properties = componentOptions(options.item, template.options, template.properties)

        dataSetValue({
          name: 'component/properties',
          value: properties,
          options
        })
      }
    })
  }

  const childNodes = []
  let childIsLazy = false
  let hasCreateEvent = false

  // set events
  if (template.events) {
    const events = template.events
    const eventTypes = template.eventTypes || {}
    const hasEvent = {}

    for (let i = 0; i < events.length; i++) {
      const { on, actionId } = events[i]
      const eventData = dataSetValue({
        name: 'event/listeners',
        value: actionId,
        options: {
          id: on + id,
          update: {
            method: 'push'
          }
        }
      })

      if (on === 'component/create') {
        hasCreateEvent = true
      }

      dataSetValue({
        name: 'component/events',
        value: eventData.id,
        options: {
          id,
          update: {
            method: 'push'
          }
        }
      })

      if (eventTypes[on] && !hasEvent[on]) {
        const nodeEvent = on.split('/')

        if (nodeEvent[0] === 'node') {
          hasEvent[on] = true
          const handler = (payload) => {
            // fire node events
            eventEmit({
              name: on,
              id,
              context: {
                id,
                rootId,
                parentId,
                groupId,
                contentId
              },
              payload
            })
          }

          node.addEventListener(nodeEvent[1], handler)

          // store handler
          dataUnsafeSetValue({ name: 'event/handlers', value: handler, options })
          // handle removal
          dataAddListener({
            name: 'event/handlers',
            on: 'delete',
            id,
            handler () {
              node.removeEventListener(on, handler)
            }
          })
        }
      }
    }

    // fire mount event
    eventEmit({
      name: 'component/mount',
      id,
      context: {
        id,
        rootId,
        contentId,
        parentId,
        groupId
      }
    })
  }

  if (template.children) {
    for (let i = 0; i < template.children.length; i++) {
      const result = createTemplate({
        template: template.children[i],
        parentId: id,
        rootId,
        groupId
      })

      if (result instanceof Promise) {
        childIsLazy = true
      }

      childNodes.push(result)
    }

    if (childIsLazy) {
      Promise.all(childNodes)
        .then(results => {
          const children = []

          for (let i = 0; i < results.length; i++) {
            const result = results[i]
            node.appendChild(result.item)
            children.push(result.id)
          }

          dataSetValue({
            name: 'component/children',
            value: children,
            options: {
              id,
              stopPropagation: true
            }
          })

          if (hasCreateEvent) {
            // fire mount event
            eventEmit({
              name: 'component/create',
              id,
              context: {
                id,
                rootId,
                contentId,
                parentId,
                groupId
              }
            })
          }
        })
        .catch(error => console.error(error))
    } else {
      const children = []
      for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i]

        node.appendChild(childNode.item)
        children.push(childNode.id)
      }

      dataSetValue({
        name: 'component/children',
        value: children,
        options: {
          id,
          stopPropagation: true
        }
      })
    }
  }

  // fire created event
  if (hasCreateEvent && !childIsLazy) {
    eventEmit({
      name: 'component/create',
      id,
      context: {
        id,
        rootId,
        contentId,
        parentId,
        groupId
      }
    })
  }

  return {
    id,
    item: node
  }
}


function updateChildren (parent, childNodes) {
  if (parent.childNodes.length > childNodes.length) {
    parent: for (let i = 0; i < parent.childNodes.length; i++) {
      const prevNode = parent.childNodes[i]

      // check if node exists in new list
      for (let i = 0; i < childNodes.length; i++) {
        const nextNode = childNodes[i].item

        if (nextNode === prevNode) {
          continue parent
        }
      }

      // remove unused node
      componentRemove({ id: prevNode.dooksaComponentId })
      prevNode.remove()
    }
  } else {
    for (let i = 0; i < childNodes.length; i++) {
      const nextNode = childNodes[i].item
      const prevNode = parent.childNodes[i]

      if (nextNode !== prevNode) {
        if (!prevNode) {
          parent.appendChild(nextNode)
        } else {
          parent.insertBefore(nextNode, prevNode)
        }
      }
    }
  }
}


const component = createPlugin('component', {
  metadata: {
    plugin: {
      title: 'Component',
      description: '',
      icon: 'mdi:widgets'
    },
    actions: {
      remove: {
        title: 'Remove component',
        description: 'Remove a single component and it\'s dependencies',
        icon: 'mdi:layers-remove'
      },
      renderChildren: {
        title: 'Render children',
        description: 'Render child components',
        icon: 'mdi:layers'
      }
    }
  },
  models: {
    nodes: {
      type: 'collection',
      items: {
        type: 'object'
      }
    },
    events: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              relation: 'event/listeners'
            },
            on: {
              type: 'string'
            },
            actionId: {
              type: 'string',
              relation: 'action/items'
            }
          }
        }
      }
    },
    items: {
      type: 'collection',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          hash: {
            type: 'string'
          },
          isTemplate: {
            type: 'boolean'
          }
        }
      }
    },
    options: {
      type: 'collection',
      items: {
        type: 'object'
      }
    },
    properties: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            }
          }
        }
      }
    },
    parents: {
      type: 'collection',
      items: {
        type: 'string',
        relation: 'component/items'
      }
    },
    roots: {
      type: 'collection',
      items: {
        type: 'string',
        relation: 'component/items'
      }
    },
    children: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'string',
          relation: 'component/items'
        }
      }
    },
    content: {
      type: 'collection',
      items: {
        type: 'string',
        relation: 'content/items'
      }
    },
    belongsToGroup: {
      type: 'collection',
      items: {
        type: 'string',
        relation: 'component/groups'
      }
    },
    groups: {
      type: 'collection',
      items: {
        type: 'array',
        items: {
          type: 'string',
          relation: 'component/items'
        },
        uniqueItems: true
      }
    }
  },
  actions: {
    /**
     * Remove component
     * @param {Object} param
     * @param {string} param.id
     * @param {boolean} [param.stopPropagation=false]
     * @param {boolean} [isHead=true]
     */
    remove ({ id, stopPropagation = false }, isHead = true) {
      const parentId = dataGetValue({ name: 'component/parents', id }).item
      const parentChildren = dataGetValue({ name: 'component/children', id: parentId })

      // remove component from parent
      if (isHead && !parentChildren.isEmpty) {
        const children = []

        // filter out current node
        for (let i = 0; i < parentChildren.item.length; i++) {
          const componentId = parentChildren.item[i]

          if (id !== componentId) {
            children.push(componentId)
          }
        }

        if (!children.length) {
          dataDeleteValue({ name: 'component/children', id: parentId })
        } else if (children.length !== parentChildren.item.length) {
          dataSetValue({
            name: 'component/children',
            value: children,
            options: {
              id: parentId,
              stopPropagation
            }
          })
        }
      }

      const events = dataGetValue({ name: 'component/events', id })

      // remove event handlers
      if (!events.isEmpty) {
        for (let i = 0; i < events.item.length; i++) {
          const event = events.item[i]

          dataDeleteValue({ name: 'event/handlers', id: event.id })
        }
      }

      const content = dataGetValue({ name: 'component/content', id })

      if (!content.isEmpty) {
        const contentId = content.item
        const contentComponents = dataGetValue({ name: 'content/components', id: contentId })

        if (!contentComponents.isEmpty) {
          if (contentComponents.item.length === 1) {
            const content = dataGetValue({ name: 'content/languages', id: contentId })

            dataDeleteValue({ name: 'content/languages', id: contentId })
            dataDeleteValue({ name: 'content/components', id: contentId })

            // remove all content languages
            for (let i = 0; i < content.item.length; i++) {
              dataDeleteValue({ name: 'content/items', id: content.item[i] })
            }
          } else {
            // remove current component from content used by list
            dataSetValue({
              name: 'content/components',
              value: id,
              options: {
                id: contentId,
                update: {
                  method: 'pull'
                }
              }
            })
          }
        }

        dataDeleteValue({ name: 'component/content', id })
      }

      const children = dataGetValue({ name: 'component/children', id })

      if (!children.isEmpty) {
        dataDeleteValue({ name: 'component/children', id, stopPropagation: true })

        for (let i = 0; i < children.item.length; i++) {
          this.remove({ id: children.item[i] }, false)
        }
      }

      // remove component from group
      const groupId = dataGetValue({ name: 'component/belongsToGroup', id }).item
      const group = dataSetValue({
        name: 'component/groups',
        value: id,
        options: {
          id: groupId,
          update: {
            method: 'pull'
          }
        }
      })

      // clean up empty group
      if (!group.item.length) {
        dataDeleteValue({ name: 'component/groups', id: groupId })

        let actionValueGroup = dataGetValue({ name: 'action/valueGroups', id: groupId })

        if (!actionValueGroup.isEmpty) {
          // remove action values
          for (let i = 0; i < actionValueGroup.item.length; i++) {
            const id = actionValueGroup.item[i]

            dataSetValue({
              name: 'action/valueGroups',
              value: id,
              options: {
                id: groupId,
                update: {
                  method: 'pull'
                }
              }
            })
            dataDeleteValue({ name: 'action/values', id })
          }
        }

        actionValueGroup = dataGetValue({ name: 'action/valueGroups', id: groupId })

        if (!actionValueGroup.item.length) {
          dataDeleteValue({ name: 'action/valueGroups', id: groupId })
        }
      }

      dataDeleteValue({ name: 'component/belongsToGroup', id })
      dataDeleteValue({ name: 'component/nodes', id })
      dataDeleteValue({ name: 'component/parents', id })
      dataDeleteValue({ name: 'component/roots', id })
      dataDeleteValue({ name: 'component/items', id })
    },
    /**
     * Render children components
     * @param {Object} param
     * @param {string} param.id - Parent component ID
     * @param {string[]} [param.items] - List of child component ID's
     */
    renderChildren ({
      id,
      items
    }) {
      if (!items) {
        items = dataGetValue({ name: 'component/children', id }).item
      }

      const node = dataGetValue({ name: 'component/nodes', id }).item
      const parentGroupId = dataGetValue({ name: 'component/belongsToGroup', id }).item
      const children = []
      let childIsLazy = false

      for (let i = 0; i < items.length; i++) {
        const childId = items[i]
        const node = dataGetValue({ name: 'component/nodes', id: childId })

        if (!node.isEmpty) {
          children.push({
            item: node.item
          })

          continue
        }

        const item = dataGetValue({ name: 'component/items', id: childId }).item

        if (item.isTemplate) {
          const groupId = item.groupId || parentGroupId
          const result = createTemplate({
            id: childId,
            template: $component(item.id),
            parentId: id,
            rootId: childId,
            groupId
          })

          childIsLazy = (result instanceof Promise)
          children.push(result)
        }
      }

      if (childIsLazy) {
        return Promise.all(children)
          .then(results => {
            updateChildren(node, results)
          })
          .catch(error => console.error(error))
      } else {
        updateChildren(node, children)
      }
    }
  },
  setup ({ rootId = 'root', component }) {
    const rootEl = document.getElementById(rootId)

    if (!rootEl) {
      throw Error('No root element found: #' + rootId)
    }

    dataUnsafeSetValue({
      name: 'component/nodes',
      value: document.body,
      options: {
        id: 'body'
      }
    })

    $component = component

    const rootItem = dataGetValue({ name: 'component/items', id: 'root' })
    let element

    if (!rootItem.isEmpty) {
      element = createNode(rootItem.id, rootItem.item)
    } else {
      element = createTemplate({
        id: 'root',
        template: $component('div'),
        parentId: 'root'
      })
    }

    // @ts-ignore
    rootEl.replaceWith(element.item)

    dataAddListener({
      name: 'component/children',
      on: 'delete',
      capture: 'all',
      handler: (data) => {
        for (let i = 0; i < data.item.length; i++) {
          this.remove({
            id: data.item[i]
          })
        }
      }
    })

    dataAddListener({
      name: 'component/children',
      on: 'update',
      capture: 'all',
      handler: (data) => {
        const id = data.id
        const options = {
          name: 'component/childrenBeforeUpdate',
          id,
          context: { id },
          payload: data.item
        }

        eventEmit(options)

        const render = this.renderChildren({ id, items: data.item })

        if (render instanceof Promise) {
          render.then(() => {
            options.name = 'component/childrenAfterUpdate'

            eventEmit(options)
          })
        } else {
          options.name = 'component/childrenAfterUpdate'

          eventEmit(options)
        }
      }
    })
  }
})

const componentRemove = component.actions.remove
const componentRenderChildren = component.actions.renderChildren

export {
  component,
  componentRemove,
  componentRenderChildren
}

export default component
