# Development
## Gulp tasks
### @configuration.js
Configuration for all gulp tasks.

### @setting.js
Environment setting etc. Base it on @settings.sample.js

### build.js
#### clean
Cleans `lib` and `dist`
#### copy:assets:lib
Copies compilable assets from `src` to `lib`
#### copy:assets:dist
Copies static assets from `src` to `dist`
#### build:lib
Builds the lib
#### build:jsonresources
Converts `.resx` to `.json`
#### build:theme
Converts `.spcolor` to `.spcolor.styl`
#### copy:pnp
Copies resources needed by PnP
#### stamp-version
Stamps version from `package.json`
#### build:pnp
Builds PnP files

### default.js
#### default
Runs the following tasks in sequence
* clean
* build:theme
* build:jsonresources
* build:pnp
* package

### lint.js
#### lint:ts
Lints your TypeScript files

### package.js
#### package:code
Packages your TypeScript using Webpack and Babel

#### package:styles
Packages your .styl files

#### package
Runs both `package:code` and `package:styles`

### watch.js
#### watch
Watches your assets files for changes.