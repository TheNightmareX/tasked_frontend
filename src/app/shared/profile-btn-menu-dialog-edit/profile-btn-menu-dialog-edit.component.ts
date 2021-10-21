import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
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

  userSnapshot!: UserFragment;

  get qualifiedDate() {
    return dayjs(this.userSnapshot.updatedAt).add(3, 'day');
  }

  get canUpdate() {
    return dayjs().isAfter(this.qualifiedDate);
  }

  constructor(
    public auth: AuthService,
    private formDataService: FormDataService,
    private userUpdateGql: UserUpdateGQL,
  ) {}

  ngOnInit() {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      this.userSnapshot = user!;
      this.data.username = this.userSnapshot.username;
      this.data.nickname = this.userSnapshot.nickname ?? '';
      this.data.gender = this.userSnapshot.gender;
    });
  }

  submit() {
    const id = this.userSnapshot.id + '';
    const data = this.cleanData(this.userSnapshot);
    this.userUpdateGql
      .mutate({ id, data })
      .pipe(map(({ data }) => data!.updateUser))
      .subscribe();
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
