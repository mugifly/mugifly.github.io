import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../article/article-card.scss'],
})
export class HomeComponent implements OnInit {
  public filteredTagName?: string;

  public tags?: string[];

  public links$ = this.scully.available$.pipe(
    map((routes) => {
      this.tags = this.getAvailableTags(routes);
      return routes.filter((route) => {
        // Exclude route of top page
        if (route.route === '/') return false;
        // Exclude route for filtering with tag
        console.log(route.tags, this.filteredTagName);
        if (
          this.filteredTagName &&
          (!route.tags || !(route.tags as string[]).map((tag) => tag.toLowerCase()).includes(this.filteredTagName))
        )
          return false;
        return true;
      });
    }),
  );

  constructor(private scully: ScullyRoutesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filteredTagName = this.route.snapshot.params.tagName
      ? (this.route.snapshot.params.tagName as string).toLowerCase()
      : undefined;
    this.tags = [];
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
