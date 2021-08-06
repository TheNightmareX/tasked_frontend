import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from './auth.interceptor';
import { ListInterceptor } from './list.interceptor';
import { PrefixInterceptor } from './prefix.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ListInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PrefixInterceptor, multi: true },
  ],
})
export class HttpInterceptorsModule {}
