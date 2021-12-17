import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DelayGuard } from '../core/delay.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rooms',
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('../rooms/rooms.module').then((m) => m.RoomsModule),
        canLoad: [DelayGuard],
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('../applications/applications.module').then(
            (m) => m.ApplicationsModule,
          ),
        canLoad: [DelayGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
