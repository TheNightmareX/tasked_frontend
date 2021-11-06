import { TestBed } from '@angular/core/testing';

import { ApolloHelperService } from './apollo-helper.service';

describe('ApolloHelperService', () => {
  let service: ApolloHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApolloHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
