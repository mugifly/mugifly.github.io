import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, repeat } from 'rxjs/operators';
import * as lunr from 'lunr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../article/article-card.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public filter: { tag: string | null; query: string | null } = {
    tag: null,
    query: null,
  };

  public queryParamsSubscription: Subscription | undefined;
  public matchedRoutesByQuery?: string[];
  private lunrIndexJson: any = null;

  public tags?: string[];

  public links$ = this.scully.available$.pipe(
    map((routes) => {
      this.tags = this.getAvailableTags(routes);
      return routes.filter((route) => {
        // Exclude route of top page
        if (route.route === '/') return false;
        // Exclude route for filtering with tag
        if (
          this.filter.tag &&
          (!route.tags || !(route.tags as string[]).map((tag) => tag.toLowerCase()).includes(this.filter.tag))
        )
          return false;
        return true;
      });
    }),
  );

  constructor(
    private scully: ScullyRoutesService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
  ) {}

  async ngOnInit() {
    this.filter.tag = this.route.snapshot.params.tagName
      ? (this.route.snapshot.params.tagName as string).toLowerCase()
      : null;

    this.queryParamsSubscription = this.route.queryParams.subscribe(async (params) => {
      this.filter.query = params.query;
      if (!this.filter.query) return;
      await this.findArticles(this.filter.query);
    });

    this.tags = [];
  }

  async ngOnDestroy() {
    if (this.queryParamsSubscription) this.queryParamsSubscription.unsubscribe();
  }

  async findArticles(query: string) {
    const matchedRoutesByQuery = [];

    if (!this.lunrIndexJson) {
      const lunrIndexUrl = this.location.prepareExternalUrl('assets/lunr-index.json');
      this.lunrIndexJson = await this.http.get(lunrIndexUrl).toPromise();
      if (!this.lunrIndexJson) return;
    }

    const lunrIndex = lunr.Index.load(this.lunrIndexJson);
    const items = lunrIndex.search(query);
    console.log('findArticles', items);
    if (items.length === 0) {
      this.matchedRoutesByQuery = [];
    }

    for (const item of items) {
      matchedRoutesByQuery.push(item.ref);
    }

    this.matchedRoutesByQuery = matchedRoutesByQuery;
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
