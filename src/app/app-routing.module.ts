import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/classrooms/last',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'classrooms',
    loadChildren: () =>
      import('./classrooms/classrooms.module').then((m) => m.ClassroomsModule),
  },
  {
    path: 'applications',
    loadChildren: () =>
      import('./applications/applications.module').then(
        (m) => m.ApplicationsModule,
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
