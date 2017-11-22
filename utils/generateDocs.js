const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')

function extractParameters(obj, trail) {
  trail = trail || []

  let leaves = []

  Object.keys(obj).forEach(key => {
    if (obj[key].doc) {
      leaves.push(Object.assign({}, transformObj(obj[key]), {_key: trail.concat(key).join('.')}))
    } else {
      leaves = leaves.concat(extractParameters(obj[key], trail.concat(key)))
    }
  })

  return leaves
}

function transformObj(obj) {
  if (obj.format) {
    if (obj.format === 'EncryptedString') {
      obj.encrypted = true
    }

    if (!(obj.format instanceof Array)) {
      delete obj.format
    }
  }

  return obj
}

try {
  const apiConfig = require(path.resolve(argv.path, 'config')).schema
  const siteConfig = require(path.resolve(argv.path, 'siteConfig')).schema

  const apiConfigData = JSON.stringify(extractParameters(apiConfig), null, 2)
  const siteConfigData = JSON.stringify(extractParameters(siteConfig), null, 2)

  fs.writeFile(path.resolve(__dirname, '..', '_data', 'apiConfig.json'), apiConfigData, err => {
    if (err) throw err
  })

  fs.writeFile(path.resolve(__dirname, '..', '_data', 'siteConfig.json'), siteConfigData, err => {
    if (err) throw err
  })
} catch (err) {
  console.log(err.stack || err)
  console.log('Couldn\'t locate Staticman.')
}
