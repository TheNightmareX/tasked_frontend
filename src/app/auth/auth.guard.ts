import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad() {
    const redirection = this.router.parseUrl('/auth');
    // Check the token first because subscribing `user$` may cause a request
    // when the cache is cleared.
    return this.auth.token.value
      ? this.auth.user$.pipe(map((user) => !!user || redirection))
      : redirection;
  }
}
