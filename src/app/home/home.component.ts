import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatestWith, map, startWith, switchMap } from 'rxjs/operators';
import { ArticleHelperService } from '../article/article-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../article/article-card.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Conditions for filtering articles
  public filter: { tag: string | null; query: string | null } = {
    tag: null,
    query: null,
  };

  // Available tags
  public tags?: string[] = [];

  // Available articles
  public links$ = this.scully.available$.pipe(
    startWith(null),
    // Remove root page
    map((pages) => pages?.filter((page) => page.route !== '/')),
    // Get tags from all articles
    map((pages) => {
      if (!pages) return [];
      this.tags = this.articleSearch.getAvailableTags(pages);
      return pages;
    }),
    // Filter with params and query params
    combineLatestWith(this.route.params.pipe(startWith(null)), this.route.queryParams.pipe(startWith(null))),
    switchMap((v: any, idx: number) => {
      let pages: ScullyRoute[] = v[0];
      const params: { tagName: string } | null = v[1];
      const queryParams: { query: string } | null = v[2];

      if (!pages) return [];

      if (params && params.tagName) {
        // Filter with tag
        pages = pages.filter((page: ScullyRoute) => page.tags.includes(params.tagName));
      }

      if (queryParams && queryParams.query) {
        // Filter with query (Full-text search)
        this.filter.query = queryParams.query;
        return this.articleSearch.findArticlesByQuery(queryParams.query).then((matchedRoutes) => {
          pages = pages.filter((page: ScullyRoute) => matchedRoutes.includes(page.route));
          return pages;
        });
      } else {
        this.filter.query = null;
      }

      return [pages];
    }),
  );

  constructor(
    private scully: ScullyRoutesService,
    private route: ActivatedRoute,
    private articleSearch: ArticleHelperService,
  ) {}

  async ngOnInit() {
    this.filter.tag = this.route.snapshot.params.tagName
      ? (this.route.snapshot.params.tagName as string).toLowerCase()
      : null;
  }

  async ngOnDestroy() {}
}
