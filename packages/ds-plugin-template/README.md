# Dooksa plugin stater kit

This plugin is a template to start development of an external plugin

### Setup config file

Edit plugins **name**, **filename**, and **version** in **ds.plugin.config.js**

### Install dependencies

```
$ npm install
```

### Development

The development directory is **/dev**

```
$ npm run dev
```

### Test plugin

The development directory is **/test**

Unit tests

```
$ npm run test:unit
```
```
$ npm run test:unit:record
```

Integration tests

```
$ npm run test:e2e
```
```
$ npm run test:e2e:record
```
### Build with hash
This will build the external plugin

```
$ npm run build
```