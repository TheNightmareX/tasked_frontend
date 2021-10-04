import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout-profile-menu',
  templateUrl: './layout-profile-menu.component.html',
  styleUrls: ['./layout-profile-menu.component.css'],
})
export class LayoutProfileMenuComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.router.navigate(['/auth']);
    this.auth.logout();
  }
}
