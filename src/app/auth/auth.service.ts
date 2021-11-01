import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../core/local-storage.service';
import { AuthGQL, MeGQL, MeQuery } from '../graphql';

type User = MeQuery['me'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token?: string;
  user$: Observable<User | undefined>;

  private userQuery;

  constructor(
    private storage: LocalStorageService,
    private authGql: AuthGQL,
    private meGql: MeGQL,
    private apollo: Apollo,
  ) {
    this.token = this.storage.load({
      key: 'token',
      validator: (v): v is this['token'] =>
        v == undefined || typeof v == 'string',
      valueOnError: undefined,
      valueOnSave: () => this.token,
    });
    this.userQuery = this.meGql.watch();
    this.user$ = this.userQuery.valueChanges.pipe(
      map(({ data }) => data.me),
      catchError(() => {
        this.token = undefined;
        return of(undefined);
      }),
    );
  }

  login(username: string, password: string) {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token }) => {
        this.token = token;
        this.userQuery.refetch();
      }),
    );
  }

  logout() {
    this.token = undefined;
    this.apollo.client.clearStore();
  }
}
