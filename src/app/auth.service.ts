import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
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
    return this.http.put<AuthInfo>('/auth/', { username, password }).pipe(
      map((info) => info.token),
      tap((token) => {
        this.#token = token;
      }),
    );
  }

  logout() {
    this.#token = null;
    this.#user = null;
  }

  loadUser() {
    return this.users.loadCurrent().pipe(
      tap((user) => {
        this.#user = user;
      }),
    );
  }
}
