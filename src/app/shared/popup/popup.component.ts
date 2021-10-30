import {
  Component,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { BreakpointsService } from 'src/app/core/breakpoints.service';

/**
 * A wrapper of {@link MatDialog} and {@link MatBottomSheet}, which displays a
 * dialog in desktop devices and a bottom sheet in mobile devices.
 *
 * This component is both the popup opener and the popup content.
 */
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @ViewChild(TemplateRef)
  private contentTemplate?: TemplateRef<never>;

  private sheetRef?: MatBottomSheetRef<PopupComponent>;
  private dialogRef?: MatDialogRef<PopupComponent>;

  constructor(
    private breakpoints: BreakpointsService,
    private dialog: MatDialog,
    private sheet: MatBottomSheet,

    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private contentTemplateWhenAsDialog?: TemplateRef<never>,

    @Optional()
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private contentTemplateWhenAsSheet?: TemplateRef<never>,
  ) {}

  ngOnInit() {}

  open() {
    this.breakpoints.phone$.pipe(take(1)).subscribe((isPhone) => {
      if (isPhone) {
        this.sheetRef = this.sheet.open(PopupComponent, {
          data: this.contentTemplate,
        });
      } else
        this.dialogRef = this.dialog.open(PopupComponent, {
          data: this.contentTemplate,
        });
    });
  }

  close() {
    this.dialogRef?.close();
    this.sheetRef?.dismiss();
  }

  get contentTemplateWhenAsPopup() {
    return this.contentTemplateWhenAsDialog || this.contentTemplateWhenAsSheet;
  }
}
