import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthGQL, UserScalarFieldsFragment } from '../graphql';
import { CoreModule } from './core.module';
import { LocalStorageService } from './local-storage.service';

type User = UserScalarFieldsFragment;

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  token?: string;
  user?: User;

  constructor(private storage: LocalStorageService, private authGql: AuthGQL) {
    this.token = this.storage.load(
      'token',
      undefined,
      (v): v is this['token'] => v == undefined || typeof v == 'string',
      () => this.token,
    );
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
