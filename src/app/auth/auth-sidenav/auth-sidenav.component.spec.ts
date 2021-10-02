import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSidenavComponent } from './auth-sidenav.component';

describe('AuthSidenavComponent', () => {
  let component: AuthSidenavComponent;
  let fixture: ComponentFixture<AuthSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
