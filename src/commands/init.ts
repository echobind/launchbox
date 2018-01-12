const path = require('path');

module.exports = {
  name: 'init',
  alias: ['i'],
  run: async context => {
    const { print, filesystem } = context;

    print.info('');
    const spinner = print.spin(`Installing default launchbox generators for your app.`);

    const currentDirectory = filesystem.cwd();
    const defaultFolder = path.join(__dirname, '../../.launchbox');
    filesystem.copy(defaultFolder, path.join(currentDirectory, '.launchbox'));

    spinner.succeed(
      'Launchbox installed. Edit config and templates in the .launchbox folder to match your project!'
    );
  }
};
