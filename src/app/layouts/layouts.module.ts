import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
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
    SharedModule,
    RouterModule,
    OverlayModule,
    ProfileModule,
    LoadingModule,
  ],
  exports: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    RefetchButtonComponent,
  ],
})
export class LayoutsModule {}
