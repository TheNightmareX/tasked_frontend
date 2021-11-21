import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSettingsSectionComponent } from './classroom-detail-settings-section.component';

describe('ClassroomDetailSettingsSectionComponent', () => {
  let component: ClassroomDetailSettingsSectionComponent;
  let fixture: ComponentFixture<ClassroomDetailSettingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassroomDetailSettingsSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailSettingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
