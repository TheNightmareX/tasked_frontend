import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, concatMap, map, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { Gender, UserCreateGQL, UserCreateInput } from 'src/app/graphql';
import { ProfileFormData } from 'src/app/profile/profile-form/profile-form-data.interface';

@Component({
  selector: 'app-auth-form-signup',
  templateUrl: './auth-form-signup.component.html',
  styleUrls: ['./auth-form-signup.component.css'],
})
export class AuthFormSignupComponent implements OnInit {
  data: ProfileFormData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };
  loading = false;
  submit$ = new Subject<Event>();

  constructor(
    private auth: AuthService,
    private notifier: NotifierService,
    private router: Router,
    private userCreateGql: UserCreateGQL,
  ) {}

  ngOnInit() {
    this.submit$.pipe(throttleTime(1000)).subscribe(() => this.submit());
  }

  private submit() {
    this.loading = true;
    const { username, password, nickname, gender } = this.data;
    const data: UserCreateInput = { username, password, nickname, gender };
    forkJoin([
      this.userCreateGql.mutate({ data }).pipe(
        concatMap(() => this.auth.login(username, password)),
        catchError(() => of(null)),
      ),
      timer(1000),
    ])
      .pipe(map((values) => values[0]))
      .subscribe((result) => {
        if (result) this.router.navigate(['/']);
        else
          this.notifier.notify(
            NotificationType.Error,
            `Username "${username}" is already taken`,
          );
        this.loading = false;
      });
  }
}
