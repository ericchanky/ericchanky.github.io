const fs = require('fs')
const path = require('path')
const package = require('./package.json')

const { version } = package

const [major, minor, patch] = version.split('.')

const newVersion = [major, minor, Number(patch) + 1].join('.')

const newPackage = { ...package, version: newVersion }

fs.writeFileSync(path.resolve(__dirname, 'package.json'), `${JSON.stringify(newPackage, null, 2)}\n`)
