import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
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
  ) {}

  ngOnInit() {}

  openEditDialog() {
    this.dialog.open(ProfileBtnMenuDialogEditComponent);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}
