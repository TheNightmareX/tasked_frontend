import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider, Type } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';

const provide = (type: Type<HttpInterceptor>): Provider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: type,
  multi: true,
});

@NgModule({
  providers: [provide(AuthInterceptor)],
})
export class HttpInterceptorsModule {}
