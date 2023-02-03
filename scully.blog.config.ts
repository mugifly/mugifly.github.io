import { ScullyConfig, setPluginConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';

import './dist/scully-plugin-esa';
import './scully/plugins/lunr/plugin';

// Full-text search with Lunr
const lunr = require('lunr');
require('lunr-languages/lunr.stemmer.support.js')(lunr);
require('lunr-languages/tinyseg.js')(lunr);
require('lunr-languages/lunr.ja.js')(lunr);
import { LunrPluginOptions } from './scully/plugins/lunr/plugin';
setPluginConfig('lunr', {
  lunr: lunr,
  lang: 'ja',
  indexJsonOutputPath: `${__dirname}/dist/static/assets/lunr-index.json`,
} as LunrPluginOptions);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  reloadPort: 18080,
  routes: {
    '/articles/:slug': {
      type: 'contentFolder',
      postRenderers: ['esaPostProcess', 'lunr'],
      slug: {
        folder: './blog',
      },
    },
  },
};
