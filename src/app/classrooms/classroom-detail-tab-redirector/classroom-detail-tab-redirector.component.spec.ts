import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailTabRedirectorComponent } from './classroom-detail-tab-redirector.component';

describe('ClassroomDetailTabRedirectorComponent', () => {
  let component: ClassroomDetailTabRedirectorComponent;
  let fixture: ComponentFixture<ClassroomDetailTabRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailTabRedirectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailTabRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
