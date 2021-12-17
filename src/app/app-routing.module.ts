import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DelayGuard } from './core/delay.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/app/rooms/last',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canLoad: [DelayGuard],
  },
  {
    path: 'app',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canLoad: [DelayGuard, AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/app',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
