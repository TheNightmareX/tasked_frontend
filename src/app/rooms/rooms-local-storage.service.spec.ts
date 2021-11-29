import { TestBed } from '@angular/core/testing';

import { RoomsLocalStorageService } from './rooms-local-storage.service';

describe('RoomsLocalStorageService', () => {
  let service: RoomsLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
