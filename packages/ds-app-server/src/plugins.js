import dssUser from '@dooksa/ds-server-plugin-user'
import dssComponents from '@dooksa/ds-server-plugin-component'
import dssSection from '@dooksa/ds-server-plugin-section'
import dssAction from '@dooksa/ds-server-plugin-action'
import dssTemplate from '@dooksa/ds-server-plugin-template'
import dssLayout from '@dooksa/ds-server-plugin-layout'
import dssEvent from '@dooksa/ds-server-plugin-event'
import dssPage from '@dooksa/ds-server-plugin-page'
import dssWidget from '@dooksa/ds-server-plugin-widget'
import dssContent from '@dooksa/ds-server-plugin-content'
import dssDatabase from '@dooksa/ds-server-plugin-database'
import dssWebServer from '@dooksa/ds-server-plugin-web-server'

const plugins = [
  {
    name: dssDatabase.name,
    version: dssDatabase.version,
    plugin: dssDatabase
  },
  {
    name: dssContent.name,
    version: dssContent.version,
    plugin: dssContent
  },
  {
    name: dssPage.name,
    version: dssPage.version,
    plugin: dssPage
  },
  {
    name: dssEvent.name,
    version: dssEvent.version,
    plugin: dssEvent
  },
  {
    name: dssLayout.name,
    version: dssLayout.version,
    plugin: dssLayout
  },
  {
    name: dssTemplate.name,
    version: dssTemplate.version,
    plugin: dssTemplate
  },
  {
    name: dssAction.name,
    version: dssAction.version,
    plugin: dssAction
  },
  {
    name: dssWidget.name,
    version: dssWidget.version,
    plugin: dssWidget
  },
  {
    name: dssSection.name,
    version: dssSection.version,
    plugin: dssSection
  },
  {
    name: dssComponents.name,
    version: dssComponents.version,
    plugin: dssComponents
  },
  {
    name: dssUser.name,
    version: dssUser.version,
    plugin: dssUser
  },
  {
    name: dssWebServer.name,
    version: dssWebServer.version,
    plugin: dssWebServer
  }
]

export default plugins