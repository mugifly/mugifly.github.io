import { registerPlugin, HandledRoute } from '@scullyio/scully';
import * as from 'fs';


const Plugin = async (routes?: HandledRoute[], config = {}): Promise<HandledRoute[]> => {
  if (!routes) {
    return [];
  }

  routes.map((route) => {
    console.log(route);
    if (route.type !== 'contentFolder') return route;

    // Remove strange extension (".html") added by esa from the url
    if (route.templateFile?.match(/\.html\.md$/)) {
      route.route = route.route.replace(/\.html$/, '');
    }

    // Convert tags string to array
    if (route.data && route.data.tags && typeof route.data.tags == 'string') {
      route.data.tags = route.data.tags.split(/\s*,\s*/);
    }

    // Open file


    return route;
  });
  return routes;
};

registerPlugin('routeProcess', 'esaRouteProcess', Plugin, 100);
