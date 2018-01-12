module.exports = {
  // The base directory for your components
  baseDir: 'src',
  // The launchbox templates folder, relative to your project root
  templateDir: '.launchbox/templates',
  // Available generator configs. Each key is a generator name.
  generatorConfig: {
    component: {
      // the file template to use
      template: 'component.js.ejs',
      // the folder the template lives in
      target: 'components/<name>',
      // the file name of the final file
      fileName: '<name>.js',
      // if this generator should force pascal case regardless of what the user typed
      pascalCase: true,
      // A description of the generator to show in help mode
      description: 'Generates a component.',
      // additional generators to run when complete
      additionalGenerators: ['componentIndex', 'componentStory', 'componentStyle']
    },
    'component:index': {
      template: 'index.js.ejs',
      target: 'components/<name>',
      fileName: 'index.js',
      description: 'Generates a component index.',
      pascalCase: true
    },
    'component:story': {
      template: 'component-story.js.ejs',
      target: 'components/<name>',
      fileName: 'stories.js',
      description: 'Generates a component story for storybook.',
      pascalCase: true
    },
    'component:style': {
      template: 'component-style.js.ejs',
      target: 'components/<name>.stories',
      fileName: 'styles.js',
      description: 'Generates a component style file',
      pascalCase: true
    }
  }
};
