import DsPlugin from '@dooksa/ds-plugin'

const dsTest = {
  name: 'dsTest',
  version: '2',
  data: {
    text: 'hello'
  },
  methods: {
    sayHi (name) {
      return this.text + ' ' + name
    }
  }
}

const plugin = new DsPlugin(dsTest, [])

plugin.init()

const sayhi = document.querySelector('#data-sayhi')
sayhi.innerHTML = plugin.methods.sayHi('John')

// Test setup() coverage
const dsTestSetup = {
  name: 'dsTestSetup',
  version: '2',
  data: {
    text: 'Success'
  },
  setup: (params) => {
    return `${params} setup`
  }
}
const pluginSetup = new DsPlugin(dsTestSetup, [])

const setupResult = pluginSetup.init('Actioned: ')

const setup = document.querySelector('#data-setup')
setup.innerHTML = setupResult

// Test dependencies coverage
const dsTestDepend = {
  name: 'dsTestDepend',
  version: '2',
  data: {
    text: 'Success'
  },
  setup: (params) => {
    return `${params} setup`
  },
  dependencies: [
    {
      name: 'dsTestSetup',
      version: 2
    }]
}

const pluginDepend = new DsPlugin(dsTestDepend, [])

pluginDepend.init()
const depend = document.querySelector('#data-depends')
depend.innerHTML = pluginDepend.dependencies[0].name
