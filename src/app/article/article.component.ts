import { AfterViewChecked, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { HighlightService } from './highlight.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss', './article-card.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ArticleComponent implements OnInit, AfterViewChecked {
  public page$ = this.scully.getCurrent();
  public pageUrl: string | undefined;

  constructor(private scully: ScullyRoutesService, private highlightService: HighlightService) {
    this.pageUrl = window.location.href;
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
