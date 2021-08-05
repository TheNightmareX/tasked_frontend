import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreateDto } from './user-create.dto';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  create(data: UserCreateDto) {
    return this.http.post<User>(this.url(), data);
  }

  retrieve(username: string) {
    return this.http.get<User>(this.url(username));
  }

  private url(username?: string) {
    const BASE = '/api/users/';
    return username ? BASE + username + '/' : BASE;
  }
}