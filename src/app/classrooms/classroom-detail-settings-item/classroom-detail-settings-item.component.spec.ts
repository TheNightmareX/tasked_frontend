import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSettingsItemComponent } from './classroom-detail-settings-item.component';

describe('ClassroomDetailSettingsItemComponent', () => {
  let component: ClassroomDetailSettingsItemComponent;
  let fixture: ComponentFixture<ClassroomDetailSettingsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomDetailSettingsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailSettingsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
