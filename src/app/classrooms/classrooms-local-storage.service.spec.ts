import { TestBed } from '@angular/core/testing';

import { ClassroomsLocalStorageService } from './classrooms-local-storage.service';

describe('ClassroomsLocalStorageService', () => {
  let service: ClassroomsLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomsLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
