import { NgModule } from '@angular/core';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { AuthFormLayoutComponent } from './auth-form-layout/auth-form-layout.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormSignupComponent } from './auth-form-signup/auth-form-signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthSidenavComponent } from './auth-sidenav/auth-sidenav.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormLayoutComponent,
    AuthFormLoginComponent,
    AuthFormSignupComponent,
    AuthSidenavComponent,
  ],
  imports: [SharedModule, AuthRoutingModule, ProfileModule],
  exports: [],
  providers: [],
})
export class AuthModule {}
