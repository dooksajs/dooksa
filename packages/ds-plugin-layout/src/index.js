/**
 * Dooksa layout tools.
 * @module plugin
 */
export default {
  name: 'dsLayout',
  version: 1,
  data: {
    items: {
      default: {},
      schema: {
        type: 'collection',
        items: {
          type: 'array',
          items: {
            type: 'object',
            required: ['componentId'],
            properties: {
              contentIndex: { type: 'number' },
              parentIndex: { type: 'number' },
              children: {
                type: 'array',
                items: { type: 'number' }
              },
              componentId: {
                type: 'string',
                relation: 'dsComponent/items'
              }
            }
          }
        }
      }
    },
    eventNames: {
      private: true,
      default: {
        mount: 'dsView/mount',
        unmount: 'dsView/unmount'
      }
    }
  },
  /** @lends dsLayout */
  methods: {
    create ({
      dsLayoutId,
      dsSectionId,
      dsSectionUniqueId,
      dsWidgetId,
      dsWidgetMode,
      dsViewId
    }) {
      const layout = this.$getDataValue('dsLayout/items', {
        id: dsLayoutId
      })

      const events = this.$getDataValue('dsWidget/events', {
        id: dsWidgetId,
        suffixId: dsWidgetMode
      }).item || {}

      const layoutItems = []
      let viewItems = this.$getDataValue('dsWidget/view', {
        id: dsWidgetId,
        suffixId: dsWidgetMode
      })
      const isViewItemsEmpty = viewItems.isEmpty

      if (isViewItemsEmpty) {
        viewItems = []
      } else {
        viewItems = viewItems.item
      }

      for (let i = 0; i < layout.item.length; i++) {
        const { componentId, contentIndex, sectionIndex, parentIndex } = layout.item[i]
        const event = events[i]
        const item = {}
        let parentViewId = dsViewId
        let sectionId = dsSectionId

        layoutItems.push(item)

        if (Number.isInteger(parentIndex)) {
          const layoutItem = layoutItems[parentIndex]

          parentViewId = layoutItem.dsViewId

          if (layoutItem.sectionId) {
            sectionId = layoutItem.sectionId
          }
        }

        const childViewId = this.$method('dsView/createNode', {
          dsViewId: viewItems[i],
          dsSectionId: sectionId,
          dsWidgetId,
          dsComponentId: componentId
        })

        this.$method('dsView/append', {
          dsViewId: childViewId,
          dsViewParentId: parentViewId
        })

        // collect new view ids for instance
        if (isViewItemsEmpty) {
          viewItems.push(childViewId)
        }

        item.dsViewId = childViewId

        if (Number.isInteger(contentIndex)) {
          const language = this.$getDataValue('dsMetadata/language').item
          const contentId = this.$getDataValue('dsWidget/content', {
            id: dsWidgetId,
            prefixId: dsSectionUniqueId,
            suffixId: dsWidgetMode,
            options: {
              position: contentIndex
            }
          }).item
          const dsContentId = this.$getDataValue('dsContent/items', {
            id: contentId,
            suffixId: language
          }).id

          // Associate dsContent with dsView item
          this.$setDataValue('dsView/content', {
            source: dsContentId,
            options: {
              id: childViewId
            }
          })

          this.$method('dsView/updateValue', { dsViewId: childViewId })

          // Update view item if content value changes
          this.$addDataListener('dsContent/items', {
            on: 'update',
            id: dsContentId,
            refId: dsViewId,
            listener: (value) => {
              this.$method('dsView/updateValue', { dsViewId: childViewId })
            }
          })
        }

        if (Number.isInteger(sectionIndex)) {
          // get next widget section id
          sectionId = this.$getDataValue('dsWidget/sections', {
            id: dsWidgetId,
            prefixId: dsSectionUniqueId,
            suffixId: dsWidgetMode,
            options: {
              position: sectionIndex
            }
          }).item

          this.$method('dsSection/create', {
            dsSectionId: sectionId,
            dsViewId: childViewId
          })
        }

        if (event) {
          // match core event names with namespaced core plugins
          const eventName = this.eventNames[event.name] || event.name

          const dsEvent = this.$setDataValue('dsEvent/listeners', {
            source: event.value,
            options: {
              id: childViewId,
              suffixId: eventName
            }
          })

          this.$setDataValue('dsPage/events', {
            source: dsEvent.id,
            options: {
              id: this.$method('dsRouter/currentPath'),
              source: {
                push: true
              }
            }
          })
        }
      }

      // set view items used with widget instance
      if (isViewItemsEmpty) {
        this.$setDataValue('dsWidget/view', {
          source: viewItems,
          options: {
            id: dsWidgetId
          }
        })
      }
    }
  }
}
