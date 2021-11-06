import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/**
 * A wrapper of {@link MatDialog} and {@link MatBottomSheet}, which opens its
 * content as a dialog in desktop devices but a bottom sheet in mobile devices.
 *
 * **NOTE**: Providers like {@link MatDialogRef} and {@link MatBottomSheetRef}
 * are not available.
 */
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @ContentChild(TemplateRef)
  private contentTemplate!: TemplateRef<never>;

  private sheetRef?: MatBottomSheetRef<PopupComponent>;
  private dialogRef?: MatDialogRef<PopupComponent>;

  constructor(
    private media: MediaObserver,
    private dialog: MatDialog,
    private sheet: MatBottomSheet,
  ) {}

  ngOnInit() {}

  open(breakpoint = 'lt-md') {
    const isPhone = this.media.isActive(breakpoint);
    if (isPhone) this.openSheet();
    else this.openDialog();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.contentTemplate);
  }

  openSheet() {
    this.sheetRef = this.sheet.open(this.contentTemplate);
  }

  close() {
    this.dialogRef?.close();
    this.sheetRef?.dismiss();
  }
}
