import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../article/article-card.scss'],
})
export class HomeComponent implements OnInit {
  links$ = this.scully.available$.pipe(
    map((routes) => {
      return routes.filter((route) => route.route !== '/');
    }),
  );

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {}
}
