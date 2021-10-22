import { Component, OnInit } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  Gender,
  UserFragment,
  UserUpdateGQL,
  UserUpdateInput,
} from 'src/app/graphql';
import { FormProfileData } from '../form-profile/form-profile-data.interface';

@Component({
  selector: 'app-profile-btn-menu-dialog-edit',
  templateUrl: './profile-btn-menu-dialog-edit.component.html',
  styleUrls: ['./profile-btn-menu-dialog-edit.component.css'],
})
export class ProfileBtnMenuDialogEditComponent implements OnInit {
  data: FormProfileData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };

  qualifiedDate$?: Observable<Dayjs>;
  canUpdate$?: Observable<boolean>;

  constructor(
    public auth: AuthService,
    private formDataService: FormDataService,
    private userUpdateGql: UserUpdateGQL,
  ) {}

  ngOnInit() {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      this.data.username = user!.username;
      this.data.nickname = user!.nickname ?? '';
      this.data.gender = user!.gender;
    });
    this.qualifiedDate$ = this.auth.user$.pipe(
      map((user) => dayjs(user!.updatedAt).add(3, 'day')),
    );
    this.canUpdate$ = this.qualifiedDate$.pipe(
      map((date) => dayjs().isAfter(date)),
    );
  }

  submit() {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      const id = user!.id + '';
      const data = this.cleanData(user!);
      this.userUpdateGql
        .mutate({ id, data })
        .pipe(map(({ data }) => data!.updateUser))
        .subscribe();
    });
  }

  private cleanData(user: UserFragment) {
    const data: UserUpdateInput = this.formDataService.pick(this.data, [
      'nickname',
      'password',
      'gender',
    ]);
    this.formDataService.filterEmpty(data);
    this.formDataService.filterUnchanged(data, user!);
    return data;
  }
}
