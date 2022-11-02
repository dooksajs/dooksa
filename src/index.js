import DsPlugin from '@dooksa/ds-plugin'
import dsMetadata from '@dooksa/ds-plugin-metadata'
import dsAction from '@dooksa/ds-plugin-action'
import dsWidget from '@dooksa/ds-plugin-widget'
import dsElement from '@dooksa/ds-plugin-element'
import dsOperators from '@dooksa/ds-plugin-operators'
import dsEvent from '@dooksa/ds-plugin-event'
import dsParameters from '@dooksa/ds-plugin-parameters'
import dsRouter from '@dooksa/ds-plugin-router'
import dsComponent from '@dooksa/ds-plugin-component'
import dsLayout from '@dooksa/ds-plugin-layout'
import dsToken from '@dooksa/ds-plugin-token'
import dsManager from '@dooksa/ds-plugin-manager'
import dsPage from '@dooksa/ds-plugin-page'
import 'bootstrap/dist/css/bootstrap.css'

export default {
  plugins: {
    [dsMetadata.name]: {
      name: dsMetadata.name,
      version: dsMetadata.version,
      plugin: dsMetadata
    },
    [dsToken.name]: {
      name: dsToken.name,
      version: dsToken.version,
      plugin: dsToken
    },
    [dsRouter.name]: {
      name: dsRouter.name,
      version: dsRouter.version,
      plugin: dsRouter
    },
    [dsComponent.name]: {
      name: dsComponent.name,
      version: dsComponent.version,
      plugin: dsComponent
    },
    [dsLayout.name]: {
      name: dsLayout.name,
      version: dsLayout.version,
      plugin: dsLayout
    },
    [dsWidget.name]: {
      name: dsWidget.name,
      version: dsWidget.version,
      plugin: dsWidget
    },
    [dsAction.name]: {
      name: dsAction.name,
      version: dsAction.version,
      plugin: dsAction
    },
    [dsEvent.name]: {
      name: dsEvent.name,
      version: dsEvent.version,
      plugin: dsEvent
    },
    [dsParameters.name]: {
      name: dsParameters.name,
      version: dsParameters.version,
      plugin: dsParameters
    },
    [dsOperators.name]: {
      name: dsOperators.name,
      version: dsOperators.version,
      plugin: dsOperators
    },
    [dsElement.name]: {
      name: dsElement.name,
      version: dsElement.version,
      plugin: dsElement
    },
    [dsPage.name]: {
      name: dsPage.name,
      version: dsPage.version,
      plugin: dsPage
    },
    dsParse: {
      name: 'dsParse',
      version: 1,
      options: {
        import: 'ds-plugin-parse',
        setupOnRequest: true
      }
    },
    dsDatabase: {
      name: 'dsDatabase',
      version: 1,
      options: {
        import: 'ds-plugin-database',
        setupOnRequest: true
      }
    },
    dsTemplate: {
      name: 'dsTemplate',
      version: 1,
      options: {
        import: 'ds-plugin-template',
        setupOnRequest: true
      }
    },
    dsUtilities: {
      name: 'dsUtilities',
      version: 1,
      options: {
        import: 'ds-plugin-utilities',
        setupOnRequest: true
      }
    }
  },
  use (plugin = {}, options = {}) {
    const item = {
      name: plugin.name,
      version: plugin.version,
      options
    }

    if (!options.import) {
      item.plugin = plugin
    }

    // ISSUE: add plugin schema checks
    this.plugins[plugin.name] = item
  },
  init ({ prefetchedPage, assetsURL, isDev, rootElementId = 'app' }) {
    const pluginManager = new DsPlugin(dsManager)
    // core plugins options
    this.plugins[dsElement.name].options = {
      setup: { rootElementId }
    }
    this.plugins[dsPage.name].options = {
      setup: { prefetchedPage }
    }

    return pluginManager.init({
      build: 1,
      plugins: this.plugins,
      DsPlugin,
      isDev
    })
  }
}
