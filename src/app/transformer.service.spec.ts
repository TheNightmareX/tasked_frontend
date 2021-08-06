import { TestBed } from '@angular/core/testing';
import { TransformerService } from './transformer.service';

describe('TransformerService', () => {
  let service: TransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
