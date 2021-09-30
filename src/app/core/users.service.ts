import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TRANSFORM } from '../http-interceptors/transformer.interceptor';
import { UserCreateDto } from '../user-create.dto';
import { User } from '../user.entity';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule,
})
export class UsersService {
  private get context() {
    return new HttpContext().set(TRANSFORM, User);
  }

  constructor(private http: HttpClient) {}

  loadCurrent() {
    return this.http.get<User>(this.url('~current'), {
      context: this.context,
    });
  }

  create(data: UserCreateDto) {
    return this.http.post<User>(this.url(), data, {
      context: this.context,
    });
  }

  retrieve(username: string) {
    return this.http.get<User>(this.url(username), {
      context: this.context,
    });
  }

  private url(username?: string) {
    const base = '/users/';
    return username ? base + username + '/' : base;
  }
}
