import { TestBed } from '@angular/core/testing';

import { ActivatedRoomMapStorage } from './activated-room-map-storage.service';

describe('ActivatedRoomMapStorage', () => {
  let service: ActivatedRoomMapStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivatedRoomMapStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
