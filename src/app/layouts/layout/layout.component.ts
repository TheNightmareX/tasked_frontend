import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  isLargeScreen = true;
  sidenavOpened?: boolean;
  toolbar?: TemplateRef<unknown>;

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
