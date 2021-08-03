import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: AuthFormLoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
