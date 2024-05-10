import app from '@dooksa/server'
import { development, templateBuild } from '@dooksa/server-plugins'
import { $setDataValue } from '@dooksa/plugins'
import esbuild from 'esbuild'
import chokidar from 'chokidar'
import logger from './logger.js'
import { resolve, extname } from 'node:path'
import { existsSync } from 'node:fs'

app.use(development)
app.use(templateBuild)

app.setup({
  options: {
    database: {
      storage: './app/.ds_snapshots/development'
    }
  },
  loader: (filename) => {
    return new Promise((resolve, reject) => {
      import(`./plugins/${filename}.js`)
        .then(({ default: plugin }) => {
          resolve(plugin)
        })
        .catch(error => reject(error))
    })
  }
})



const devDirectory = resolve('./app')
const appClientEntryPoint = resolve('./src/client-app.js')

esbuild.context({
  entryPoints: [appClientEntryPoint, resolve(devDirectory, 'assets', 'styles.css')],
  bundle: true,
  outdir: devDirectory,
  format: 'esm',
  sourcemap: 'inline',
  platform: 'browser',
  write: false,
  legalComments: 'none',
  minify: false,
  dropLabels: ['PROD'],
  reserveProps: /__d__/,
  plugins: [{
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

        logger('Client built in:', timer)

        if (result.outputFiles.length) {
          // set app script
          for (let i = 0; i < result.outputFiles.length; i++) {
            const file = result.outputFiles[i]
            const fileExtension = extname(file.path)

            if (fileExtension === '.js') {
              $setDataValue('page/app', result.outputFiles[i].text)
            }
          }

          // notify sse to reload
          $setDataValue('development/rebuildClient', ++rebuildClientNum)
        }
      })
    }
  }]
})
  .then(ctx => {
    ctx.watch()
  })
