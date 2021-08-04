import { NgModule } from '@angular/core';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons/';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { SharedModule } from '../shared/shared.module';
import { AuthFormLayoutComponent } from './auth-form-layout/auth-form-layout.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

const icons = [UserOutline, LockOutline];

@NgModule({
  declarations: [
    AuthComponent,
    AuthFormLayoutComponent,
    AuthFormLoginComponent,
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
    AuthRoutingModule,
  ],
})
export class AuthModule {}
