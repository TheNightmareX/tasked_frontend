import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  sidenavOpened$!: Observable<boolean>;
  sidenavMode$!: Observable<MatDrawerMode>;

  constructor(public auth: AuthService, private media: MediaObserver) {}

  ngOnInit() {
    this.sidenavOpened$ = this.media
      .asObservable()
      .pipe(
        map((items) =>
          items.some((item) => item.mqAlias == 'gt-md' && item.matches),
        ),
      );
    this.sidenavMode$ = this.sidenavOpened$.pipe(
      map((value) => (value ? 'side' : 'over')),
    );
  }
}
