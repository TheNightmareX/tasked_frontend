import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout-content',
  templateUrl: './layout-content.component.html',
  styleUrls: ['./layout-content.component.scss'],
})
export class LayoutContentComponent implements OnInit, OnDestroy {
  isLargeScreen = false;
  sidenavOpened?: boolean;

  private subscription!: Subscription;

  constructor(public auth: AuthService, private media: MediaObserver) {}

  ngOnInit() {
    this.subscription = this.media.asObservable().subscribe((items) => {
      this.isLargeScreen = items.some(
        (item) => item.mqAlias == 'gt-md' && item.matches,
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
