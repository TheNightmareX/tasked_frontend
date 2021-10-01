import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, map, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackbar: MatSnackBar,
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
      .pipe(map(([token]) => token))
      .subscribe((token) => {
        if (token) this.router.navigate(['/']);
        else
          this.snackbar.open('Invalid username or password', undefined, {
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        this.loading = false;
      });
  }
}
