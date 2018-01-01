'use strict';

const ConcatSource = require('webpack-sources').ConcatSource;

class WebpackBundleAppend {
  constructor (snippets) {
    if (!Array.isArray(snippets)) { snippets = [snippets]; }
    this.snippets = snippets;
  }

  append (compilation, name, filename) {
    if (typeof name === 'undefined') {
		  name = filename;
	  }
    this.snippets.forEach((snippet) => {
      if (snippet.match && !name.match(snippet.match)) { return; }

      let sources = [compilation.assets[filename]];
      if (snippet.header) { sources.unshift(snippet.header); }
      if (snippet.footer) { sources.push(snippet.footer); }

      compilation.assets[filename] = new ConcatSource(...sources);
    });
  }

  apply (compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('after-optimize-chunk-assets', (chunks) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach(this.append.bind(this, compilation, chunk.name));
        });
      });
    });
  }
}

module.exports = WebpackBundleAppend;
