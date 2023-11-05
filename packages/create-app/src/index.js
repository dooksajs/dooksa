import DsPlugin from '@dooksa/ds-plugin'
import dsManager from '@dooksa/ds-plugin-manager'

export default () => ({
  /**
   * Add dooksa plugins to the app
   * @param {Object[]} plugins
   * @param {string} plugins[].name - Name of plugin
   * @param {number} plugins[].version - Version of plugin
   * @param {dsPlugin} plugins[].value - dsPlugin
   */
  use (plugins) {
    // ISSUE: add plugin schema checks
    // Make a copy of the plugin list and nested data
    this._plugins = this._plugins.concat(plugins)

    // this is pretty weak protection
    for (let i = 0; i < this._plugins.length; i++) {
      if (this._plugins[i].value) {
        this._plugins[i].value = Object.assign(this._plugins[i].value, {})
      }

      this._plugins[i] = Object.assign(this._plugins[i], {})
    }
  },
  /**
   * @param {Object} start
   * @param {DsPluginOptions[]} start.options - Plugin setup option overrides
   * @returns {Object|undefined} - Development mode functions used to interact with the app
   */
  start ({ options = [], isDev }, { onSuccess, onError }) {
    const pluginManager = new DsPlugin(dsManager)

    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      const plugin = this._getPlugin(option.name)

      if (plugin) {
        if (plugin.options) {
          let setup = option.setup

          if (plugin.options.setup) {
            setup = Object.assign(plugin.options.setup, setup)
          }

          plugin.options.setup = setup
        } else {
          plugin.options = {
            setup: option.setup
          }
        }
      }
    }

    // start dooksa
    pluginManager.init({
      plugins: this._plugins,
      isDev,
      onSuccess,
      onError
    })
  },
  _plugins: [],
  _getPlugin (name) {
    return this._plugins.find(item => item.name === name)
  }
})
