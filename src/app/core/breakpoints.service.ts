import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule,
})
export class BreakpointsService {
  mobile$: Observable<boolean>;

  constructor(observer: BreakpointObserver) {
    this.mobile$ = observer
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map((state) => state.matches));
  }
}
