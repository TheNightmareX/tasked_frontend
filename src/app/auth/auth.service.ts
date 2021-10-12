import { Injectable } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../core/local-storage.service';
import { AuthGQL, MeGQL, UserScalarFieldsFragment } from '../graphql';

type User = UserScalarFieldsFragment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token?: string;
  user?: User;

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
    return this.token
      ? this.meGql.fetch().pipe(
          map(({ data }) => data.me),
          catchError(() => of(undefined)),
          tap((user) => {
            this.user = user;
          }),
        )
      : of(undefined);
  }

  login(username: string, password: string) {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token, user }) => {
        this.token = token;
        this.user = user;
      }),
    );
  }

  logout() {
    this.token = undefined;
    this.user = undefined;
  }
}
