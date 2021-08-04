import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

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

  constructor(private http: HttpClient, private storage: LocalStorageService) {
    this.#token = this.storage.load(
      'token',
      null,
      (v): v is string | null => v == null || typeof v == 'string',
      () => this.#token,
    );
  }

  login(username: string, password: string) {
    const token$ = this.http
      .put<AuthInfo>(
        '/api/auth/',
        { username, password },
        { observe: 'body', responseType: 'json' },
      )
      .pipe(
        map((info) => info.token),
        share(),
      );

    token$.subscribe((token) => {
      this.#token = token;
    });

    return token$;
  }

  logout() {
    this.#token = null;
  }
}
