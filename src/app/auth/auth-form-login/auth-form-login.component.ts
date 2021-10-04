import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, map, tap, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationType } from 'src/app/notification-type.enum';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.css'],
})
export class AuthFormLoginComponent implements OnInit {
  data = { username: '', password: '' };
  loading = false;
  submit$ = new Subject<Event>();

  constructor(
    private router: Router,
    private auth: AuthService,
    private notifier: NotifierService,
  ) {}

  ngOnInit() {
    this.submit$.pipe(throttleTime(1000)).subscribe(() => this.submit());
  }

  private submit() {
    const { username, password } = this.data;
    this.loading = true;
    forkJoin([
      this.auth.login(username, password).pipe(catchError(() => of(null))),
      timer(1000),
    ])
      .pipe(map(([data]) => data))
      .subscribe((data) => {
        if (data) this.router.navigate(['/']);
        else
          this.notifier.notify(
            NotificationType.Error,
            'Invalid username or password',
          );
        this.loading = false;
      });
  }
}
