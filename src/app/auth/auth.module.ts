import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { AuthFormLayoutComponent } from './auth-form-layout/auth-form-layout.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormSignupComponent } from './auth-form-signup/auth-form-signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormLayoutComponent,
    AuthFormLoginComponent,
    AuthFormSignupComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
})
export class AuthModule {}
