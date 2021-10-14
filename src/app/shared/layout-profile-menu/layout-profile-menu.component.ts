import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import dayjs from 'dayjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/notification-type.enum';
import { LayoutProfileDialogEditComponent } from '../layout-profile-dialog-edit/layout-profile-dialog-edit.component';

@Component({
  selector: 'app-layout-profile-menu',
  templateUrl: './layout-profile-menu.component.html',
  styleUrls: ['./layout-profile-menu.component.css'],
})
export class LayoutProfileMenuComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {}

  openEditDialog() {
    const DAY = 3;
    const canUpdate = dayjs(this.auth.user?.updatedAt).isBefore(
      dayjs().subtract(DAY, 'day'),
    );
    if (!canUpdate)
      this.notifier.notify(
        NotificationType.Error,
        'Cannot update frequently within 3 days',
      );
    else {
      this.dialog.open(LayoutProfileDialogEditComponent);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}
