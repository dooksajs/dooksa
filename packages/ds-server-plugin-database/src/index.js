import { existsSync, rename } from 'fs'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'

/**
 * @namespace dsDatabase
 */
export default {
  name: 'dsDatabase',
  version: 1,
  dependencies: [{
    name: 'dsWebServer'
  }, {
    name: 'dsUser'
  }],
  data: {
    path: {
      private: true,
      default: ''
    },
    storage: {
      default: 'ds_data',
      private: true
    }
  },
  setup (storage) {
    // if (storage) {
    //   this.storage = storage
    // }
    const path = process.cwd()

    this.path = resolve(path, this.storage)

    if (!existsSync(this.path)) {
      throw new Error('Storage path does not exist:', this.path)
    }

    // route: add section
    this.$setWebServerRoute('/', {
      method: 'post',
      middleware: ['dsUser/auth'],
      handlers: [this._create.bind(this)]
    })
  },
  methods: {
    $getDatabaseValue (collections) {
      return (request, response) => {
        const result = []

        for (let i = 0; i < collections.length; i++) {
          const collection = collections[i]

          for (let i = 0; i < request.query.id.length; i++) {
            const id = request.query.id[i]
            const data = this.$getDataValue(collection, { id })

            if (data.isEmpty) {
              return response.status(404).send('Document not found:', collection, id)
            }

            result.push({ id, item: data.item })
          }
        }

        response.status(200).send(result)
      }
    },
    $deleteDatabaseValue (collections) {
      return (request, response) => {
        let result = 0

        for (let i = 0; i < collections.length; i++) {
          const collection = collections[i]

          for (let i = 0; i < request.query.id.length; i++) {
            const query = request.query[i]
            const data = this.$deleteDataValue(collection, query.id, { cascade: query.cascade })

            if (!data.deleted) {
              return response.status(400).send('Could not delete document:', collection, query.id)
            }

            result += i
          }
        }

        response.status(200).send('deleted:', result)
      }
    },
    _create (request, response) {
      const items = request.body
      const usedCollections = {}

      for (let i = 0; i < items.length; i++) {
        const data = items[i]
        const setData = this.$setDataValue(data.collection, {
          source: data.item,
          options: {
            id: data.id,
            userId: request.user.id
          }
        })

        if (!setData.isValid) {
          return response.status(400).send(setData.error.details)
        }

        usedCollections[data.collection] = true
      }

      const collections = Object.keys(usedCollections)
      const filePaths = []
      const files = []
      const timestamp = Date.now()

      for (let i = 0; i < collections.length; i++) {
        const collection = collections[i]
        const data = this.$getDataValue(collection)
        const fileName = collection.replace('/', '_')
        const tempFilePath = resolve(this.path, fileName + '-' + timestamp + '.json')
        const filePath = resolve(this.path, fileName + '.json')
        const file = writeFile(tempFilePath, JSON.stringify({ collection, item: data.item, createdAt: timestamp }))

        filePaths.push([tempFilePath, filePath])
        files.push(file)
      }

      const renamed = []

      Promise.all(files)
        .then(() => {
          for (let i = 0; i < filePaths.length; i++) {
            const filePath = filePaths[i]

            rename(filePath[0], filePath[1], (error) => {
              if (error) {
                throw error
              }

              renamed.push(i)
            })
          }

          response.status(201).send('Successfully saved')
        })
        .catch(error => {
          if (renamed.length) {
            return response.status(500).send({ message: 'Failed to rename, must restore data!' })
          }

          // delete temp files
          response.status(500).send(error)
        })
    }
  }
}
