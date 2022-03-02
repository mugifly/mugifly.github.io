import { ScullyConfig, registerPlugin } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';

import './scully/plugins/esa-route-process/plugin';
import './scully/plugins/esa-post-process/plugin';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/articles/:slug': {
      type: 'contentFolder',
      postRenderers: ['esaPostProcess'],
      slug: {
        folder: './blog',
      },
    },
  },
};
