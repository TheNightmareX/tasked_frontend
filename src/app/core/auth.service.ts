import { Injectable } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthGQL, MeGQL, UserScalarFieldsFragment } from '../graphql';
import { LocalStorageService } from './local-storage.service';

type User = UserScalarFieldsFragment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token?: string;
  user$ = new ReplaySubject<User | undefined>(1);

  constructor(
    private storage: LocalStorageService,
    private authGql: AuthGQL,
    private meGql: MeGQL,
  ) {
    this.token = this.storage.load(
      'token',
      undefined,
      (v): v is this['token'] => v == undefined || typeof v == 'string',
      () => this.token,
    );
  }

  refetch() {
    if (this.token)
      this.meGql
        .fetch()
        .pipe(
          map(({ data }) => data.me),
          catchError(() => of(undefined)),
        )
        .subscribe(this.user$);
    else this.user$.next(undefined);
    return this.user$;
  }

  login(username: string, password: string) {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token, user }) => {
        this.token = token;
        this.user$.next(user);
      }),
    );
  }

  logout() {
    this.token = undefined;
    this.user$.next(undefined);
  }
}
