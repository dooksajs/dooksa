import createApp from '../../utils/createApp'
import dsConfig from 'dsConfig'
import buildTemplates from '../../utils/buildTemplates'
import page from '../../data/index.js'

const plugins = dsConfig.devDependencies ?? { options: [], plugins: {} }
const options = dsConfig.options ?? {}
const setup = dsConfig.setup ?? {}
const app = createApp(page, plugins, { ...options, setup })

window.dsApp = app

// build templates
if (dsConfig.templates) {
  const dsWidgetSectionId = page.widgets.entry[page.id][0]

  buildTemplates(app, dsConfig.templates)
    .then(instances => {
      for (let i = 0; i < instances.length; i++) {
        const instance = instances[i]

        for (let i = 0; i < instance.templates.length; i++) {
          const template = instance.templates[i]
          const instanceId = app.$method('dsWidget/insertInstance', {
            dsWidgetSectionId
          })

          app.$setDataValue('dsWidget/instanceTemplates', {
            source: template.id,
            options: {
              id: instanceId,
              suffixId: template.mode
            }
          })
        }
      }

      const rootViewId = app.$getDataValue('dsView/rootViewId')

      app.$method('dsWidget/attachSection', {
        dsWidgetSectionId,
        dsViewId: rootViewId.item
      })
    })
}
