import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class GraphqlAuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (this.auth.token.value)
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.auth.token.value}` },
      });
    return next.handle(request);
  }
}
