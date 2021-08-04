import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { Gender } from 'src/app/gender.enum';
import { UserCreateDto } from 'src/app/user-create.dto';
import { UsersService } from 'src/app/users.service';

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
  isCooling = false;

  constructor(
    private users: UsersService,
    private auth: AuthService,
    private messanger: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {}

  submit() {
    if (this.isCooling) return;
    this.isCooling = true;
    this.isLoading = true;

    const { username, password, nickname, gender } = this.data;
    const data: UserCreateDto = { username, password, nickname, gender };
    forkJoin([
      this.users.create(data).pipe(
        concatMap(() => this.auth.login(username, password)),
        map(([user]) => user),
        catchError(() => of(null)),
      ),
      timer(1000),
    ])
      .pipe(map(([user]) => user))
      .subscribe((result) => {
        this.isLoading = false;
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.messanger.error('Username is already taken');
          timer(1000).subscribe(() => {
            this.isCooling = false;
          });
        }
      });
  }
}
