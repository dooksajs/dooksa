import {
  dsMetadata,
  dsAction,
  dsToken,
  dsRouter,
  dsComponent,
  dsView,
  dsLog,
  dsContent,
  dsLayout,
  dsWidget,
  dsSection,
  dsEvent,
  dsOperator,
  dsPage,
  dsDatabase,
  dsTemplate,
  dsQuery,
  dsList
} from '@dooksa/ds-plugin'

const plugins = [
  {
    name: dsLog.name,
    version: dsLog.version,
    value: dsLog
  },
  {
    name: dsMetadata.name,
    version: dsMetadata.version,
    value: dsMetadata
  },
  {
    name: dsList.name,
    version: dsList.version,
    value: dsList
  },
  {
    name: dsQuery.name,
    version: dsQuery.version,
    value: dsQuery
  },
  {
    name: dsAction.name,
    version: dsAction.version,
    value: dsAction
  },
  {
    name: dsToken.name,
    version: dsToken.version,
    value: dsToken
  },
  {
    name: dsRouter.name,
    version: dsRouter.version,
    value: dsRouter
  },
  {
    name: dsComponent.name,
    version: dsComponent.version,
    value: dsComponent
  },
  {
    name: dsView.name,
    version: dsView.version,
    value: dsView
  },
  {
    name: dsContent.name,
    version: dsContent.version,
    value: dsContent
  },
  {
    name: dsLayout.name,
    version: dsLayout.version,
    value: dsLayout
  },
  {
    name: dsWidget.name,
    version: dsWidget.version,
    value: dsWidget
  },
  {
    name: dsSection.name,
    version: dsSection.version,
    value: dsSection
  },
  {
    name: dsEvent.name,
    version: dsEvent.version,
    value: dsEvent
  },
  {
    name: dsOperator.name,
    version: dsOperator.version,
    value: dsOperator
  },
  {
    name: dsPage.name,
    version: dsPage.version,
    value: dsPage
  },
  {
    name: dsDatabase.name,
    version: dsDatabase.version,
    value: dsDatabase
  },
  {
    name: dsTemplate.name,
    version: dsTemplate.version,
    value: dsTemplate
  }
]

export default plugins
