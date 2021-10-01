import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of, Subject, timer } from 'rxjs';
import { catchError, concatMap, map, throttleTime } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { UserCreateInput, Gender, CreateUserGQL } from 'src/app/graphql';

@Component({
  selector: 'app-auth-form-signup',
  templateUrl: './auth-form-signup.component.html',
  styleUrls: ['./auth-form-signup.component.css'],
})
export class AuthFormSignupComponent implements OnInit {
  genderSelections = [
    { text: 'Male', value: Gender.Male },
    { text: 'Female', value: Gender.Female },
    { text: 'Alien', value: Gender.Unknown },
  ];

  data = {
    username: '',
    nickname: undefined as string | undefined,
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };

  isLoading = false;

  submit$ = new Subject<Event>();

  constructor(
    private auth: AuthService,
    private messenger: NzMessageService,
    private router: Router,
    private createUserSql: CreateUserGQL,
  ) {}

  ngOnInit() {
    this.submit$.pipe(throttleTime(1000)).subscribe(() => this.submit());
  }

  private submit() {
    this.isLoading = true;
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
        else this.messenger.error('Username is already taken');
        this.isLoading = false;
      });
  }
}
