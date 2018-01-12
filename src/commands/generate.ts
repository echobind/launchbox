const generateFileWithConfigAndName = async (context, generator, name) => {
  const { strings, template: { generate } } = context;
  const { generatorConfig } = context.config;
  const { pascalCase } = strings;
  const baseDir = context.config['baseDir'];
  const templateDir = context.config['templateDir'];

  // TODO: this or options.pascalCase (launchbox g component --pascalCase)
  if (generator.pascalCase) name = pascalCase(name);

  // replace name token in file name (TODO: better way to do this?)
  const fileName = generator.fileName.replace('<name>', name);
  const targetName = generator.target.replace('<name>', name);
  const target = `${baseDir}/${targetName}/${fileName}`;

  // TODO: bail if template doesn't exist

  await generate({
    directory: templateDir,
    template: generator.template, // TODO: this -> .launchbox/templates -> plugins -> src/templates
    target,
    props: { name }
  });

  const additionalGenerators = (generator.additionalGenerators || []).reduce(
    (prev, generatorName) => {
      const generatorObject = generatorConfig[generatorName];
      let additionalFiles = generateFileWithConfigAndName(context, generatorObject, name);
      return prev.concat(additionalFiles);
    },
    [target]
  );

  return await Promise.all(additionalGenerators);
};

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async context => {
    const { parameters, print } = context;
    const { color } = print;

    const generatorName = parameters.first;
    let itemName = parameters.second;
    const { generatorConfig } = context.config;
    const generator = generatorConfig[generatorName];

    const spinner = print.spin(`Generating a new ${generatorName}`);

    // list generators if no arguments
    if (!parameters.first) {
      spinner.stop();
      const generators = Object.keys(generatorConfig);
      print.info(
        `Usage: launchbox g ${print.color.highlight('<generator>')} ${print.color.highlight(
          '<name>'
        )} ${print.color.muted('<options>')}`
      );

      print.info('');
      print.info('Available generators:');
      generators.forEach(g => {
        const descriptionText = generatorConfig[g].description;
        print.info(`  ${g}`);

        if (!descriptionText) {
          print.info('');
          return;
        }

        print.info(`    ${print.color.muted(descriptionText)}`);
      });

      return;
    }

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

    const newFiles = await generateFileWithConfigAndName(context, generator, itemName);

    spinner.succeed('All done!');
    print.info('');

    newFiles.forEach(f => print.info(`Created ${f}`));
  }
};
