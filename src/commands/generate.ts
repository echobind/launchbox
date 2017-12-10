module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async context => {
    const { parameters, template: { generate } } = context
    console.log(context.config)

    const name = parameters.first
    const generator = context.config[name]
    const templateDir = context.config['templateDir']
    const baseDir = context.config['baseDir']

    if (!generator) {
      throw new Error(`no generator found for ${name}. did you add it to the .makereact file?`)
    }

    const fileName = generator.fileName.replace('<name>', name)

    await generate({
      directory: templateDir,
      template: `model.ts.ejs`,
      target: `${baseDir}/${generator.target}/${fileName}`,
      props: { name },
    })
  },
}
