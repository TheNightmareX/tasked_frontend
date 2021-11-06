import { Injectable } from '@angular/core';
import { TypedDocumentNode } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ApolloHelperService {
  constructor(private apollo: Apollo) {}

  updateQueryCache<Data = never, Variables = never>({
    query,
    data,
    variables,
  }: UpdateQueryCacheOptions<Data, Variables>) {
    const prev = this.apollo.client.cache.readQuery({ query, variables });
    if (prev) this.apollo.client.cache.writeQuery({ query, data: data(prev) });
  }
}

interface UpdateQueryCacheOptions<Data, Variables> {
  query: TypedDocumentNode<Data, Variables>;
  variables?: Variables;
  data: (prev: Data) => Data;
}
