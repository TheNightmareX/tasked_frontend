import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subject } from 'rxjs';
import { concatMap, finalize, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { filterKeys } from 'src/app/common/filter-keys.func';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { Gender, UserCreateGQL, UserCreateInput } from 'src/app/graphql';
import { ProfileFormData } from 'src/app/profile/profile-form/profile-form-data.interface';

@Component({
  selector: 'app-auth-form-signup',
  templateUrl: './auth-form-signup.component.html',
  styleUrls: ['./auth-form-signup.component.scss'],
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
    const data: UserCreateInput = filterKeys(
      {
        username,
        password,
        nickname,
        gender,
      },
      (v) => v != '',
    );
    this.userCreateGql
      .mutate({ data })
      .pipe(
        concatMap(() => this.auth.login(username, password)),

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
            $localize`Username "${username}" is already taken`,
          );
        },
      );
  }
}
