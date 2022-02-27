import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { HighlightService } from './highlight.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss', './article-card.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ArticleComponent implements OnInit, AfterViewChecked {
  public page$ = this.scully.getCurrent();

  constructor(
    private scully: ScullyRoutesService,
    private highlightService: HighlightService
  ) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }
}
