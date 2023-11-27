/**
 * @typedef {Object} DsPlugin - Dooksa plugin
 * @property {string} name - Name of plugin
 * @property {Object[]} dependencies - List of dependent plugins
 * @property {string} dependencies[].name - Name of dependent plugin
 * @property {number} dependencies[].version - version of dependent plugin
 * @property {number} version - Version of plugin
 * @property {Function} setup - Setup function that is run on plugin initialisation
 * @property {Object.<string, DsPluginData>} data - Data that the plugin will manage
 * @property {Object} methods
 */

/**
 * @typedef {Object} DsPluginData - Dooksa plugin data
 * @property {Boolean} private - Bind data to the scope of the plugin
 * @property {Function} default - Default value to be set
 * @property {DsPluginSchema} schema - The data schema
 */

/**
 * @typedef {Object} DsPluginSchema - Dooksa data schema
 * @property {'collection'|'object'|'array'|'string'|'number'|'boolean'} type - Data type
 * @property {DsPluginSchemaItem} items
 * @property {DsPluginSchemaObject} properties
 * @property {DsPluginSchemaObject} patternProperties
 * @property {Function} suffixId - Collection suffix id
 * @property {Function} prefixId - Collection prefix id
 * @property {Function} defaultId - Default collection id
 */

/**
 * @typedef {Object} DsPluginSchemaItem - Dooksa data schema
 * @property {'object'|'array'|'string'|'number'|'boolean'} type - Data type
 * @property {DsPluginSchemaItem} items
 * @property {DsPluginSchemaObjectProperty} properties - The properties of an object
 * @property {DsPluginSchemaObjectProperty} patternProperties - The property name is equal regex pattern, e.g patternProperties: { '[0-9]': { } }
 */

/**
 * @typedef {Object} DsPluginSchemaObjectProperty
 * @property {'object'|'array'|'string'|'number'|'boolean'} type - Data type
 * @property {DsPluginSchemaItem} items
 * @property {DsPluginSchemaObjectProperty} properties - The properties of an object
 * @property {DsPluginSchemaObjectProperty} patternProperties - The property name is equal regex pattern, e.g patternProperties: { '[0-9]': { } }
 * @property {boolean} additionalProperties - Additional properties are allowed by default
 * @property {string[]} required - List of required properties that must exist and contain a value
 */

/**
 * @typedef {Object} DsPluginComponent
 * @property {string} name - Name of HTMLElement
 * @property {string} type - Category of element, e.g. <img> == 'image'
 * @property {Object} content - The getter and setters for the element
 * @property {DsPluginComponentGet[]} content.get[] - The element getters
 * @property {DsPluginComponentSet[]} content.set[] - The element setters
 */

/**
 * @typedef {Object} DsPluginComponentGet
 * @property {'attribute'|'getter'} type - The type of getter by getAttribute or an element getter
 * @property {string} name - The name of the attribute
 * @property {string} contentProperty - The property name for the dsContent object to store the value
 */

/**
 * @typedef {Object} DsPluginComponentSet
 * @property {'attribute'|'setter'} type - The type of setter by setAttribute or an element setter
 * @property {string} name - The name of the attribute
 * @property {string} contentProperty - The property name for the dsContent object to store the value
 */

/**
 * @method DsPluginMethod
 * @param {Object} param - Public methods parameter requires a single object
 */

/**
 * @typedef {Object} DsPluginMethodContext
 * @property {function} value - The contextual plugin function
 * @property {string[]} scope - A list of plugins to restrict the scope
 * @property {boolean} export - Export the method to the global app
 */

/**
 * Define a dooksa plugin
 * @param {Object} plugin - Plugin object
 * @param {string} plugin.name - Name of plugin
 * @param {Object[]} plugin.dependencies - List of dependent plugins
 * @param {string} plugin.dependencies[].name - Name of dependent plugin
 * @param {number} plugin.dependencies[].version - version of dependent plugin
 * @param {number} plugin.version - Version of plugin
 * @param {Function} plugin.setup - Setup function that is run on plugin initialisation
 * @param {Object.<string, DsPluginData>} plugin.data - Data that the plugin will manage
 * @param {Object.<string, DsPluginComponent>} plugin.components
 * @param {Object} plugin.methods
 * @param {Object.<string, (DsPluginMethodContext|Function)>} plugin.methods.context - Context methods are bound to each plugins scope unless specified otherwise
 * @param {Object.<string, DsPluginMethod>} plugin.methods.public - Public methods are available within the plugins local scope and shared with other plugins via this.$method('dsExample/methodName')
 * @param {Object.<string, Function>} plugin.methods.private - Private methods scope is bound to the plugin only
 * @returns {DsPlugin}
 */
function definePlugin (plugin) {
  return plugin
}

export default definePlugin