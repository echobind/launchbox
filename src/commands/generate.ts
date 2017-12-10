module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async context => {
    const { parameters, template: { generate }, print } = context
    const { color } = print

    const name = parameters.first
    const generator = context.config[name]
    const templateDir = context.config['templateDir']
    const baseDir = context.config['baseDir']

    const spinner = print.spin(`Generating a new ${name}!`)

    if (!generator) {
      spinner.fail(
        `No generator found for ${color.highlight(name)}. Run ${color.highlight(
          'generate',
        )} command with no arguments to see all available generators.`,
      )
      return
    }

    const fileName = generator.fileName.replace('<name>', name)
    const target = `${baseDir}/${generator.target}/${fileName}`

    await generate({
      directory: templateDir,
      template: generator.template,
      target,
      props: { name },
    })

    spinner.succeed('All done! 🚀')
    print.info(`Created ${target}`)
    print.info(print.colors.muted('TODO: run other related generators...'))
  },
}
