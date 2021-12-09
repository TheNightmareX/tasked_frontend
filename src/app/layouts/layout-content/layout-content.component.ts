import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout-content',
  templateUrl: './layout-content.component.html',
  styleUrls: ['./layout-content.component.scss'],
})
export class LayoutContentComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  landscape$!: Observable<boolean>;

  constructor(public auth: AuthService, private media: MediaObserver) {}

  ngOnInit() {
    this.landscape$ = this.media
      .asObservable()
      .pipe(
        map((items) =>
          items.some((item) => item.mqAlias == 'gt-md' && item.matches),
        ),
      );
  }
}
