import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutsModule } from '../layouts/layouts.module';
import { LoadingModule } from '../loading/loading.module';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { ThemeModule } from '../theme/theme.module';
import { AuthFormLayoutComponent } from './auth-form-layout/auth-form-layout.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormSignupComponent } from './auth-form-signup/auth-form-signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormLayoutComponent,
    AuthFormLoginComponent,
    AuthFormSignupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    LayoutsModule,
    ProfileModule,
    ThemeModule,
    LoadingModule,
  ],
})
export class AuthModule {}
