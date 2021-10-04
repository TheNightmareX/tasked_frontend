import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryCache } from '@apollo/client/core';
import { NotifierModule } from 'angular-notifier';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { ConstantsModule } from './constants/constants.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NotifierModule,

    CoreModule,
    SharedModule,
    ConstantsModule,

    AuthModule,
    ClassroomsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        link: httpLink.create({ uri: '/graphql/' }),
        cache: new InMemoryCache(),
      }),
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
