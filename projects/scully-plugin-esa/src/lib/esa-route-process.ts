import { registerPlugin, HandledRoute } from '@scullyio/scully';
import * as fs from 'fs/promises';
import { marked } from 'marked';

// @ts-ignore
import { JSDOM } from 'jsdom';

const Plugin = async (routes?: HandledRoute[], config = {}): Promise<HandledRoute[]> => {
  if (!routes) {
    return [];
  }

  for (let i = 0, l = routes.length; i < l; i++) {
    const route = routes[i];

    if (route.type !== 'contentFolder') continue;

    if (route.data === undefined) {
      route.data = {};
    }

    // Remove strange extension (".html") added by esa from the url
    if (route.templateFile?.match(/\.html\.md$/)) {
      route.route = route.route.replace(/\.html$/, '');
    }

    // Convert tags string to array
    if (route.data && route.data.tags && typeof route.data.tags == 'string') {
      route.data.tags = route.data.tags.split(/\s*,\s*/);
    }

    // Parse file
    if (route.templateFile && route.templateFile.match(/\.md$/)) {
      try {
        let markdown = await fs.readFile(route.templateFile, 'utf-8');
        let markdownLines = markdown.split(/\n/);
        let endLineOfMetaData = 0;
        for (let i = 1; i < markdownLines.length; i++) {
          if (markdownLines[i].match(/^---$/)) {
            endLineOfMetaData = i;
            break;
          }
        }
        markdown = markdownLines.slice(endLineOfMetaData + 1).join('\n');

        const html = marked.parse(markdown);
        const dom = new JSDOM(html);

        // Extract beginning text
        route.data.beginningText = '';
        const paragraphs = dom.window.document.querySelectorAll('p');
        for (let i = 0; i < paragraphs.length; i++) {
          const paragraph = paragraphs[i];
          if (paragraph.textContent?.length) {
            route.data.beginningText += paragraph.textContent;
          }
          if (route.data.beginningText.length > 200) {
            break;
          }
        }

        // Extract images
        route.data.imageUrls = [];
        const imageElems = dom.window.document.querySelectorAll('img');
        for (let i = 0; i < imageElems.length; i++) {
          const image = imageElems[i];
          route.data.imageUrls.push(image.src);
        }
      } catch (e: any) {
        console.error(`[EsaRouteProcess]`, e);
      }
    } else {
      console.warn(`[EsaRouteProcess]`, 'Could not parse file', route.templateFile);
    }

    routes[i] = route;
  }

  return routes;
};

registerPlugin('routeProcess', 'esaRouteProcess', Plugin, 100);
