import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IntersectionObserverModule } from '@ng-web-apis/intersection-observer';
import { ValidatorsModule } from '../validators/validators.module';
import { AutoFormFieldColorDirective } from './auto-form-field-color.directive';
import { FetchMoreTriggerComponent } from './fetch-more-trigger/fetch-more-trigger.component';
import { LoadingDirective } from './loading.directive';
import { PopupComponent } from './popup/popup.component';
import { UsernameComponent } from './username/username.component';

const modules = [
  CommonModule,
  FormsModule,
  FlexLayoutModule,
  IntersectionObserverModule,
  [
    MatRippleModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTabsModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatExpansionModule,
  ],
  ValidatorsModule,
];

const components = [
  PopupComponent,
  UsernameComponent,
  FetchMoreTriggerComponent,
];

const directives = [AutoFormFieldColorDirective, LoadingDirective];

@NgModule({
  declarations: [components, directives],
  imports: [modules, RouterModule],
  exports: [modules, components, directives],
})
export class SharedModule {}
