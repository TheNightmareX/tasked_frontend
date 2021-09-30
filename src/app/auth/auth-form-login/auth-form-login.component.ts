import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, map, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.css'],
})
export class AuthFormLoginComponent implements OnInit {
  data = { username: '', password: '' };

  isLoading = false;

  submit$ = new Subject<Event>();

  constructor(
    private router: Router,
    private auth: AuthService,
    private messenger: NzMessageService,
  ) {}

  ngOnInit() {
    this.submit$.pipe(throttleTime(1000)).subscribe(() => this.submit());
  }

  private submit() {
    const { username, password } = this.data;
    this.isLoading = true;
    forkJoin([
      this.auth.login(username, password).pipe(catchError(() => of(null))),
      timer(1000),
    ])
      .pipe(map(([token]) => token))
      .subscribe((token) => {
        if (token) this.router.navigate(['/']);
        else this.messenger.error('Invalid username or password');
        this.isLoading = false;
      });
  }
}
