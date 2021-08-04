import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  retrieve(username: string) {
    return this.http.get<User>(this.url(username));
  }

  private url(username?: string) {
    const BASE = '/api/users/';
    return username ? BASE + username + '/' : BASE;
  }
}
