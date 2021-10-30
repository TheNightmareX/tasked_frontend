import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSettingsComponent } from './classroom-detail-settings.component';

describe('ClassroomDetailSettingsComponent', () => {
  let component: ClassroomDetailSettingsComponent;
  let fixture: ComponentFixture<ClassroomDetailSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
