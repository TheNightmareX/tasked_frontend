import { TestBed } from '@angular/core/testing';
import { ListInterceptor } from './list.interceptor';

describe('ListInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ListInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: ListInterceptor = TestBed.inject(ListInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
