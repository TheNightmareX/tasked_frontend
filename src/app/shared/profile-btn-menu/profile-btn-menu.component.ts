import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import dayjs from 'dayjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/notification-type.enum';
import { ProfileBtnMenuDialogEditComponent } from '../profile-btn-menu-dialog-edit/profile-btn-menu-dialog-edit.component';

@Component({
  selector: 'app-profile-btn-menu',
  templateUrl: './profile-btn-menu.component.html',
  styleUrls: ['./profile-btn-menu.component.css'],
})
export class ProfileBtnMenuComponent implements OnInit {
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
      this.dialog.open(ProfileBtnMenuDialogEditComponent);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}