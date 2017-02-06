# Assets Append Webpack Plugin

This plugin allow you to append text/code/whatever to your assets with webpack 2.

## Requirements

- node >= 6.9.4
- webpack >= 2.2.0

## Installation

```bash
npm install assets-append-webpack-plugin --save
```

Or add it to your package.json

## Usage

Add the plugin in your `webpack.config.js`:

```javascript
'use strict';

const AssetsAppendWebpackPlugin = require('assets-append-webpack-plugin');

module.exports = {
  entry: 'foo.js',
  output: {
    path: './build',
    filename: '[name].js'
  },
  plugins: [
    new AssetsAppendWebpackPlugin({
      header: '/* lorem ipsum */',
      footer: '/* lorem ipsum */'
    })
  ]
};
```

This plugin take an object or an array of objects. Each object can take theses arguments:
```javascript
[{
  [header: '/* lorem ipsum */',]
  [footer: '/* lorem ipsum */',]
  [match: /buildname.js/] // optional: bundle's name must match this pattern, useful if you want to have differents header/footer for your bundles
}]
```
