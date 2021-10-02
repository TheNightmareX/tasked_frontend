import { TestBed } from '@angular/core/testing';

import { ClassroomsStateService } from './classrooms-state.service';

describe('ClassroomsStateService', () => {
  let service: ClassroomsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
