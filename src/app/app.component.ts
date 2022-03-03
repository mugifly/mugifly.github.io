import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blog';
  searchQuery = '';

  constructor(private router: Router) {}

  public onChangeSearchInput(event: any) {
    this.search(this.searchQuery);
  }

  public search(query: string): void {
    this.router.navigate(['/'], { queryParams: { query: query } });
  }
}
