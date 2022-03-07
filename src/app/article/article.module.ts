import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { HighlightService } from './highlight.service';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { ShareButtonComponent } from './share-button.component';

@NgModule({
  declarations: [ArticleComponent, ShareButtonComponent],
  imports: [
    CommonModule,
    ScullyLibModule,
    FlexLayoutModule,
    MatCardModule,
    ArticleRoutingModule,
  ],
  providers: [HighlightService],
})
export class ArticleModule {}
