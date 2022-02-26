import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatBottomSheetModule,
  ],
  exports: [ModalComponent],
})
export class ModalModule {}
