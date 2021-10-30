import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

@NgModule({
  imports: [HttpClientModule],
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
})
export class GraphqlModule {}
