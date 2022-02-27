import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../article/article-card.scss'],
})
export class HomeComponent implements OnInit {
  links$ = this.scully.available$;

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {}
}
