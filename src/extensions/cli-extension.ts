// add your CLI-specific functionality here, which will then be accessible
// to your commands
const path = require('path')

module.exports = context => {
  const { filesystem } = context
  const currentDirectory = filesystem.cwd()
  const configFile = path.join(currentDirectory, '.launchbox')

  if (!filesystem.exists(configFile)) {
    throw new Error(`config file not found`)
  }

  // TODO: error checking
  const config = filesystem.read(configFile, 'json')
  context.config = config
}
