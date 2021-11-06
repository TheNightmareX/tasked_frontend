import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailSettingsActionsComponent } from './classroom-detail-settings-actions.component';

describe('ClassroomDetailSettingsActionsComponent', () => {
  let component: ClassroomDetailSettingsActionsComponent;
  let fixture: ComponentFixture<ClassroomDetailSettingsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomDetailSettingsActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomDetailSettingsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
