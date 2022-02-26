import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchMoreTriggerComponent } from './fetch-more-trigger.component';

describe('FetchMoreTriggerComponent', () => {
  let component: FetchMoreTriggerComponent;
  let fixture: ComponentFixture<FetchMoreTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FetchMoreTriggerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchMoreTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
