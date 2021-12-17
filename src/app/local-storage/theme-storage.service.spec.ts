import { TestBed } from '@angular/core/testing';

import { ThemeStorage } from './theme-storage.service';

describe('ThemeStorage', () => {
  let service: ThemeStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
