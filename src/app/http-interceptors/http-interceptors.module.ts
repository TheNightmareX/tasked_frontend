import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider, Type } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { ListInterceptor } from './list.interceptor';
import { PrefixInterceptor } from './prefix.interceptor';
import { TransformerInterceptor } from './transformer.interceptor';

const register = (type: Type<HttpInterceptor>): Provider => ({
  provide: HTTP_INTERCEPTORS,
  useClass: type,
  multi: true,
});

@NgModule({
  providers: [
    register(AuthInterceptor),
    register(ListInterceptor),
    register(TransformerInterceptor),
    register(PrefixInterceptor),
  ],
})
export class HttpInterceptorsModule {}
