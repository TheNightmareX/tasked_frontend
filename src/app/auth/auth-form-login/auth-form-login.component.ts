import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.css'],
})
export class AuthFormLoginComponent implements OnInit {
  data = { username: '', password: '' };
  isLoading = false;
  isCooling = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messenger: NzMessageService,
  ) {}

  ngOnInit() {}

  submit() {
    if (this.isCooling) return;
    this.isCooling = true;

    const { username, password } = this.data;

    this.isLoading = true;
    forkJoin([
      this.authService
        .obtainToken(username, password)
        .pipe(catchError(() => of(undefined))),
      timer(1000),
    ])
      .pipe(map(([token]) => token))
      .subscribe((token) => {
        if (token) {
          this.authService.token = token;
          this.router.navigate(['/']);
        } else {
          this.messenger.error('Invalid username or password');
          timer(500).subscribe(() => (this.isCooling = false));
        }
        this.isLoading = false;
      });
  }
}
