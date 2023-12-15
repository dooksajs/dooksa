import path from 'path'
import esbuild from 'esbuild'
import { appDirectory, scriptDirectory } from '../utils/paths.js'
import dsApp from '@dooksa/ds-app-server'
import { dsEsbuild, dsTemplateBuild } from '@dooksa/ds-plugin-server'
import chalk from 'chalk'
import { existsSync, watch } from 'fs'
const devDirectory = path.resolve(appDirectory, 'app')
const buildDirectory = path.resolve(scriptDirectory, 'entry', 'dev')
const dsAppClientEntryPoint = path.resolve(buildDirectory, 'ds-app-client.js')
let dsAppServer

const dsConfigPath = path.resolve(appDirectory, 'ds-config.js')
const widgetTemplateDir = path.resolve(devDirectory, 'widgets')

function log (message, timer = 0) {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0')

  message =
    chalk.grey(`${hours}:${minutes}:${seconds}.${milliseconds} `) +
    chalk.white('Info: ') +
    chalk.green(message)

  if (timer) {
    message = message + ' ' + chalk.blue(Math.floor(timer) + ' ms')
  }

  console.log(message)
}

// no config found
if (!existsSync(dsConfigPath)) {
  initApp()
}

import(path.resolve(appDirectory, 'ds-config.js'))
  .then(({ default: options }) => {
    initApp(options)
  })

function initApp (options = []) {
  const defaultOptions = [
    {
      name: 'dsDatabase',
      setup: {
        storage: path.resolve(devDirectory, '.ds_snapshots')
      }
    },
    {
      name: 'dsWebServer',
      setup: {
        cookieSecret: 'RTRe50oe-wX8gd9qzrWUY71W4yGob10c',
        publicPath: path.resolve(devDirectory, 'assets')
      }
    },
    {
      name: 'dsUser',
      setup: {
        secret: 'RTRe50oe-wX8gd9qzrWUY71W4yGob10c'
      }
    },
    {
      name: 'dsPage',
      setup: {
        dsApp
      }
    },
    {
      name: 'dsTemplateBuild',
      setup: {
        buildDir: widgetTemplateDir
      }
    }
  ]

  for (let i = 0; i < options.length; i++) {
    const option = options[i]

    for (let i = 0; i < defaultOptions.length; i++) {
      const defaultOption = defaultOptions[i]

      if (option.name === defaultOption.name) {
        if (option.setup) {
          if (defaultOption.setup) {
            defaultOption.setup = Object.assign(defaultOption.setup, option.setup)
          } else {
            defaultOption.setup = option.setup
          }
        } else if (option.import) {
          defaultOption.import = option.import
        }

        if (Object.prototype.hasOwnProperty.call(option, 'setupOnRequest')) {
          defaultOption.setupOnRequest = option.setupOnRequest
        }

        break
      }
    }

    defaultOptions.push(option)
  }

  dsApp.use([
    {
      name: dsEsbuild.name,
      version: dsEsbuild.version,
      value: dsEsbuild
    },
    {
      name: dsTemplateBuild.name,
      version: dsTemplateBuild.version,
      value: dsTemplateBuild
    }
  ])

  dsApp.start({
    isDev: true,
    options: defaultOptions
  }, {
    onSuccess (app) {
      app.$method('dsWebServer/start')

      dsAppServer = app

      watch(widgetTemplateDir, (eventType, filename) => {
        app.$method('dsTemplateBuild/create', { path: path.resolve(widgetTemplateDir, filename) })
        app.$setDataValue('dsEsbuild/rebuildServer', 1)

        log('Template ' + chalk.magenta(filename) + ' ' + chalk.blue('[' + eventType + ']'))
      })
    },
    onError (error) {
      console.log(error)
    }
  })

  const dsRebuildClientPlugin = {
    name: 'dsRebuildClient',
    setup (build) {
      let timerStart
      let rebuildClientNum = 0

      build.onStart(() => {
        timerStart = performance.now()
      })

      build.onEnd(result => {
        if (result.errors.length) {
          return { errors: result.errors }
        }

        const timer = performance.now() - timerStart

        log('Client built in:', timer)

        if (result.outputFiles.length) {
          // set app script
          dsAppServer.$method('dsPage/setApp', result.outputFiles[0].text)
          dsAppServer.$method('dsPage/setCSS', result.outputFiles[1].text)

          // notify sse to reload
          dsAppServer.$setDataValue('dsEsbuild/rebuildClient', ++rebuildClientNum)
        }
      })
    }
  }

  esbuild.context({
    entryPoints: [dsAppClientEntryPoint, path.resolve(devDirectory, 'assets', 'styles.css')],
    bundle: true,
    outdir: devDirectory,
    format: 'esm',
    sourcemap: 'inline',
    platform: 'browser',
    write: false,
    legalComments: 'none',
    minify: false,
    reserveProps: /__d__/,
    plugins: [dsRebuildClientPlugin]
  })
    .then(ctx => {
      ctx.watch()
    })
}
