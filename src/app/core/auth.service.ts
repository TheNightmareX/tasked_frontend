import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthGQL, UserScalarFieldsFragment } from '../graphql';
import { CoreModule } from './core.module';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  #token: string | null = null;
  get token() {
    return this.#token;
  }

  #user: UserScalarFieldsFragment | null = null;
  get user() {
    return this.#user;
  }

  constructor(private storage: LocalStorageService, private authGql: AuthGQL) {
    this.#token = this.storage.load(
      'token',
      null,
      (v): v is string | null => v == null || typeof v == 'string',
      () => this.#token,
    );
  }

  login(username: string, password: string) {
    return this.authGql.mutate({ username, password }).pipe(
      map(({ data }) => data!.auth),
      tap(({ token, user }) => {
        this.#token = token;
        this.#user = user;
      }),
    );
  }

  logout() {
    this.#token = null;
    this.#user = null;
  }
}
