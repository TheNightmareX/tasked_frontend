import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

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
