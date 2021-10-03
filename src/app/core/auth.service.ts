import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthGQL, MeGQL, UserScalarFieldsFragment } from '../graphql';
import { CoreModule } from './core.module';
import { LocalStorageService } from './local-storage.service';

type User = UserScalarFieldsFragment;

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  token?: string;
  user$?: Observable<User>;

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
    if (this.token)
      this.user$ = this.meGql.fetch().pipe(map(({ data }) => data.me));
  }

  login(username: string, password: string) {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token, user }) => {
        this.token = token;
        this.user$ = of(user);
      }),
    );
  }

  logout() {
    this.token = undefined;
    this.user$ = undefined;
  }
}
