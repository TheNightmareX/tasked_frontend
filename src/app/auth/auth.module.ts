import { NgModule } from '@angular/core';
import {
  InfoCircleOutline,
  LockOutline,
  TagOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons/';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { SharedModule } from '../shared/shared.module';
import { AuthFormLayoutComponent } from './auth-form-layout/auth-form-layout.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormSignupComponent } from './auth-form-signup/auth-form-signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

const icons = [UserOutline, LockOutline, InfoCircleOutline, TagOutline];

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormLayoutComponent,
    AuthFormLoginComponent,
    AuthFormSignupComponent,
  ],
  imports: [
    SharedModule,
    NzIconModule.forChild(icons),
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzDividerModule,
    NzButtonModule,
    NzMessageModule,
    NzRadioModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
