import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomRedirectorComponent } from './classroom-redirector.component';

describe('ClassroomRedirectorComponent', () => {
  let component: ClassroomRedirectorComponent;
  let fixture: ComponentFixture<ClassroomRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomRedirectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
