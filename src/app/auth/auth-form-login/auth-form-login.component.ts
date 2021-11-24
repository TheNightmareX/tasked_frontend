import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { finalize, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.css'],
})
export class AuthFormLoginComponent implements OnInit {
  data = { username: '', password: '' };
  loading = false;
  submit$ = new Subject<Event>();

  @ViewChild(MatInput) private firstInput?: MatInput;

  constructor(
    private router: Router,
    private auth: AuthService,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    this.submit$.pipe(throttleTime(1000)).subscribe(() => this.submit());
    setTimeout(() => {
      this.firstInput?.focus();
    });
  }

  private submit() {
    const { username, password } = this.data;
    this.loading = true;
    this.auth
      .login(username, password)
      .pipe(
        leastTime(1000),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Invalid username or password`,
          );
        },
      );
  }
}
