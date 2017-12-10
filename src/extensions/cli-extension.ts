// add your CLI-specific functionality here, which will then be accessible
// to your commands
const toml = require('toml')
const jetpack = require('fs-jetpack')
const path = require('path')

module.exports = context => {
  const currentDirectory = jetpack.cwd()
  const configFile = path.join(currentDirectory, '.makereact')

  if (!jetpack.exists(configFile)) {
    throw new Error(`config file not found`)
  }

  // TODO: error checking
  const config = jetpack.read(configFile, 'json')
  context.config = config
}
