import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider, Type } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';

const register = (type: Type<HttpInterceptor>): Provider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: type,
  multi: true,
});

@NgModule({
  providers: [register(AuthInterceptor)],
})
export class HttpInterceptorsModule {}
