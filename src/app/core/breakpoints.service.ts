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
  phone$: Observable<boolean>;

  constructor(private observer: BreakpointObserver) {
    this.mobile$ = this.observe(Breakpoints.Small, Breakpoints.XSmall);
    this.phone$ = this.observe(Breakpoints.XSmall);
  }

  private observe(...values: string[]) {
    return this.observer.observe(values).pipe(map((state) => state.matches));
  }
}
