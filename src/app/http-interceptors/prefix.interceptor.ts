import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PrefixInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const url = request.url == '/graphql/' ? request.url : '/api' + request.url;
    request = request.clone({ url });
    return next.handle(request);
  }
}
