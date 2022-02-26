import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ContainerModule } from '../container/container.module';
import { LoadingModule } from '../loading/loading.module';
import { ProfileModule } from '../profile/profile.module';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutComponent } from './layout/layout.component';
import { RefetchButtonComponent } from './refetch-button/refetch-button.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    RefetchButtonComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    OverlayModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    ProfileModule,
    LoadingModule,
    ContainerModule,
  ],
  exports: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    RefetchButtonComponent,
  ],
})
export class LayoutsModule {}
