import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { LayoutMainComponent } from './layouts/layout-main/layout-main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/rooms/last',
  },
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'rooms',
        loadChildren: () =>
          import('./rooms/rooms.module').then((m) => m.RoomsModule),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./applications/applications.module').then(
            (m) => m.ApplicationsModule,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/rooms/last',
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
