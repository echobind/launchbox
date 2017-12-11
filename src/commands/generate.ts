module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async context => {
    const { parameters, template: { generate }, print, strings } = context;
    const { color } = print;
    const { pascalCase, camelCase } = strings;

    const generatorName = parameters.first;
    let itemName = parameters.second;
    const generator = context.config.generatorConfig[camelCase(generatorName)];
    const templateDir = context.config['templateDir'];
    const baseDir = context.config['baseDir'];

    const spinner = print.spin(`Generating a new ${generatorName}`);

    // bail if command doesn't exist
    if (!generator) {
      spinner.fail(
        `No generator found for ${color.highlight(generatorName)}. Run ${color.highlight(
          'generate'
        )} command with no arguments to see all available generators.`
      );
      return;
    }

    // bail if we dont have enough arguments
    if (!itemName) {
      spinner.fail(
        `You must supply a second argument to ${generatorName}. We need to know the file you want to create! 🤠`
      );
      return;
    }

    // TODO: this or options.pascalCase (launchbox g component --pascalCase)
    if (generator.pascalCase) itemName = pascalCase(itemName);

    // replace name token in file name (TODO: better way to do this?)
    const fileName = generator.fileName.replace('<name>', itemName);
    const targetName = generator.target.replace('<name>', itemName);
    const target = `${baseDir}/${targetName}/${fileName}`;

    await generate({
      directory: templateDir,
      template: generator.template, // TODO: this -> .launchbox/templates -> plugins -> src/templates
      target,
      props: { name: itemName }
    });

    spinner.succeed('All done! 🚀');
    print.info(`Created ${target}`);
    print.info(print.colors.muted('TODO: run other related generators...'));
  }
};
