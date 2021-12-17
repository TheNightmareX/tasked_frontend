import { TestBed } from '@angular/core/testing';

import { DelayGuard } from './delay.guard';

describe('DelayGuard', () => {
  let guard: DelayGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DelayGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
