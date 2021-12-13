import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './core/loading.service';
import { ThemesService } from './core/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private themes: ThemesService,
    private loading: LoadingService,
  ) {}

  ngOnInit() {
    this.themes.init();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) this.loading.count++;
      else if (event instanceof NavigationEnd) this.loading.count--;
    });
  }
}
