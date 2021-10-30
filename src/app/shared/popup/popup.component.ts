import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { BreakpointsService } from 'src/app/core/breakpoints.service';

/**
 * A wrapper of {@link MatDialog} and {@link MatBottomSheet}, which opens its
 * content as a dialog in desktop devices but a bottom sheet in mobile devices.
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
    private breakpoints: BreakpointsService,
    private dialog: MatDialog,
    private sheet: MatBottomSheet,
  ) {}

  ngOnInit() {}

  open() {
    this.breakpoints.phone$.pipe(take(1)).subscribe((isPhone) => {
      if (isPhone) this.sheetRef = this.sheet.open(this.contentTemplate);
      else this.dialogRef = this.dialog.open(this.contentTemplate);
    });
  }

  close() {
    this.dialogRef?.close();
    this.sheetRef?.dismiss();
  }
}
