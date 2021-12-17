import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Force a delay before loading lazy modules to show the loading animation. :-]
 */
@Injectable({
  providedIn: 'root',
})
export class DelayGuard implements CanLoad {
  canLoad() {
    return of(true).pipe(delay(300));
  }
}
