import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageItem } from '../common/local-storage-item.class';
import { AuthGQL, MeGQL, MeQuery } from '../graphql';

type User = MeQuery['me'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: LocalStorageItem<string | undefined>;
  user$: Observable<User | undefined>;

  private userQuery;

  constructor(
    private authGql: AuthGQL,
    private meGql: MeGQL,
    private apollo: Apollo,
  ) {
    this.token = new LocalStorageItem(
      'token',
      (v) => v == undefined || typeof v == 'string',
      undefined,
    );
    this.userQuery = this.meGql.watch();
    this.user$ = this.userQuery.valueChanges.pipe(
      map(({ data }) => data.me),
      catchError(() => {
        this.token.save(undefined);
        return of(undefined);
      }),
    );
  }

  login(username: string, password: string) {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token }) => {
        this.token.save(token);
        this.userQuery.refetch();
      }),
    );
  }

  logout() {
    this.token.save(undefined);
    this.apollo.client.clearStore();
  }
}
