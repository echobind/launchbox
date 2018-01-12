# Launchbox

A **pluggable** file generator for your React and React Native applications.

Before Launchbox:
"I need to make a new component"

* open file + copy + find folder + right click + new + name it + paste :angry:
* repeat for related things like stories, styles, or tests

With your new superpowers:
"I need to make a new component"

`launchbox g component something`

✔ All done! 🚀
Created src/components/Modal/Modal.js
Created src/components/Modal/index.js
Created src/components/Modal/stories.js
Created src/components/Modal/styles.js

## Installation

`yarn add launchbox --dev`

## Usage

Use `launchbox generate` (or `launchbox g`) to generate files for your project.

Launchbox includes the following generators out of the box:

* Component Index (component/<name>/index.js)
* Component Stories (component/<name>/stories.js)
* Component Styles (component/<name>/styles.js)
* Component (component/<name>/<name>.js & all above component files)

## Customizing

The above is a good starting point, but you'll likely need to customize the provided config or file templates.

To do that, run `launchbox init`.

The default file generators will be copied into your project and you can tweak based on your needs.

To add a new file generator:

1. Create a template in `.launchbox/templates`
2. Add a complementary generator config to `.launchbox/config.js`

## Examples

TODO

## Future Plans

* Plugins for common configurations

# License

MIT - see LICENSE
