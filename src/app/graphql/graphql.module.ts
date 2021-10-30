import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpBatchLink } from 'apollo-angular/http';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (link: HttpBatchLink) => ({
        link: link.create({ uri: '/graphql/' }),
        cache: new InMemoryCache(),
      }),
      deps: [HttpBatchLink],
    },
  ],
})
export class GraphqlModule {}
