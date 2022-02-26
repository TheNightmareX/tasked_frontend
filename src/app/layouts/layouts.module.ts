import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
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
  imports: [SharedModule, OverlayModule, ProfileModule, LoadingModule],
  exports: [
    LayoutComponent,
    LayoutHeaderComponent,
    LayoutContentComponent,
    RefetchButtonComponent,
  ],
})
export class LayoutsModule {}
