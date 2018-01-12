// add your CLI-specific functionality here, which will then be accessible
// to your commands
const path = require('path');

module.exports = context => {
  const { filesystem } = context;
  const currentDirectory = filesystem.cwd();
  let configFile = path.join(currentDirectory, '.launchbox/config.js');

  if (!filesystem.exists(configFile)) {
    configFile = path.join(__dirname, '../../.launchbox/config.js');
  }

  const config = require(configFile);
  context.config = config;
};
