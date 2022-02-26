import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthGQL, MeGQL, MeQuery } from '../graphql';
import { AuthTokenStorage } from './auth-token.storage';

type User = MeQuery['me'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  private userQuery;

  constructor(
    public token: AuthTokenStorage,
    private notifier: NotifierService,
    private apollo: Apollo,
    private authGql: AuthGQL,
    private meGql: MeGQL,
  ) {
    this.userQuery = this.meGql.watch();
    this.user$ = this.userQuery.valueChanges.pipe(
      map(({ data }) => data.me),
      catchError(() => {
        this.token.next(null).save();
        return of(null);
      }),
    );
  }

  login(username: string, password: string) {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token }) => {
        this.token.next(token).save();
        this.userQuery.refetch();
      }),
    );
  }

  logout() {
    this.token.next(null).save();
    this.apollo.client.clearStore();
    this.notifier.hideAll();
  }
}
