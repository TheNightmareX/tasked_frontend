import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
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
  token: LocalStorageItem<string | null>;
  user$: Observable<User | null>;

  private userQuery;

  constructor(
    private notifier: NotifierService,
    private apollo: Apollo,
    private authGql: AuthGQL,
    private meGql: MeGQL,
  ) {
    this.token = new LocalStorageItem(
      'token',
      (v) => v == null || typeof v == 'string',
      null,
    );
    this.userQuery = this.meGql.watch();
    this.user$ = this.userQuery.valueChanges.pipe(
      map(({ data }) => data.me),
      catchError(() => {
        this.token.save(null);
        return of(null);
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
    this.token.save(null);
    this.apollo.client.clearStore();
    this.notifier.hideAll();
  }
}
