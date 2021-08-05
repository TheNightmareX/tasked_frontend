import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { User } from './user.interface';
import { UsersService } from './users.service';

interface AuthInfo {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #token: string | null = null;
  get token() {
    return this.#token;
  }

  #user: User | null = null;
  get user() {
    return this.#user;
  }

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private users: UsersService,
  ) {
    this.#token = this.storage.load(
      'token',
      null,
      (v): v is string | null => v == null || typeof v == 'string',
      () => this.#token,
    );
  }

  login(username: string, password: string) {
    return this.http
      .put<AuthInfo>(
        '/auth/',
        { username, password },
        { observe: 'body', responseType: 'json' },
      )
      .pipe(
        map((info) => info.token),
        concatMap((token) =>
          this.users
            .retrieve(username)
            .pipe(map((user) => [user, token] as const)),
        ),
        tap(([user, token]) => {
          this.#user = user;
          this.#token = token;
        }),
      );
  }

  logout() {
    this.#token = null;
  }
}
