import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, concatMap, map, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateUserGQL, Gender, UserCreateInput } from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';
import { FormProfileData } from '../../shared/form-profile/form-profile-data.interface';

@Component({
  selector: 'app-auth-form-signup',
  templateUrl: './auth-form-signup.component.html',
  styleUrls: ['./auth-form-signup.component.css'],
})
export class AuthFormSignupComponent implements OnInit {
  data: FormProfileData = {
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
    private createUserSql: CreateUserGQL,
  ) {}

  ngOnInit() {
    this.submit$.pipe(throttleTime(1000)).subscribe(() => this.submit());
  }

  private submit() {
    this.loading = true;
    const { username, password, nickname, gender } = this.data;
    const data: UserCreateInput = { username, password, nickname, gender };
    forkJoin([
      this.createUserSql.mutate({ data }).pipe(
        concatMap(() => this.auth.login(username, password)),
        map((data) => data.user),
        catchError(() => of(null)),
      ),
      timer(1000),
    ])
      .pipe(map((values) => values[0]))
      .subscribe((user) => {
        if (user) this.router.navigate(['/']);
        else
          this.notifier.notify(
            NotificationType.Error,
            'Username is already taken',
          );
        this.loading = false;
      });
  }
}
