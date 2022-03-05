import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import * as lunr from 'lunr';

@Injectable({
  providedIn: 'root',
})
export class ArticleHelperService {
  // Index for full-text search of articles
  private lunrIndexJson: any = null;

  constructor(private http: HttpClient, private location: Location) {}

  async findArticlesByQuery(query: string): Promise<string[]> {
    const matchedRoutesByQuery = [];

    if (!this.lunrIndexJson) {
      const lunrIndexUrl = this.location.prepareExternalUrl('assets/lunr-index.json');
      this.lunrIndexJson = await this.http.get(lunrIndexUrl).toPromise();
      if (!this.lunrIndexJson) return [];
    }

    const lunrIndex = lunr.Index.load(this.lunrIndexJson);
    const items = lunrIndex.search(query);

    if (items.length === 0) {
      return [];
    }

    for (const item of items) {
      matchedRoutesByQuery.push(item.ref);
    }

    return matchedRoutesByQuery;
  }

  getAvailableTags(routes: ScullyRoute[]): string[] {
    const tags: { [key: string]: boolean } = {};
    routes.map((route) => {
      if (!route.tags) return;
      route.tags.map((tagName: string) => {
        tags[tagName.toLowerCase()] = true;
      });
    });

    return Object.keys(tags);
  }
}
