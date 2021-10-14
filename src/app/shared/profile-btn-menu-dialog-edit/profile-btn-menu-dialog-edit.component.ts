import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  Gender,
  UpdateUserGQL,
  CommonUserFragment,
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

  constructor(
    public auth: AuthService,
    private formDataService: FormDataService,
    private updateUserGql: UpdateUserGQL,
  ) {}

  ngOnInit() {
    this.data.username = this.auth.user!.username;
    this.data.nickname = this.auth.user!.nickname ?? '';
    this.data.gender = this.auth.user!.gender;
  }

  submit() {
    const id = this.auth.user!.id + '';
    const data = this.cleanData(this.auth.user!);
    this.updateUserGql
      .mutate({ id, data })
      .pipe(map(({ data }) => data!.updateUser))
      .subscribe();
  }

  private cleanData(user: CommonUserFragment) {
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
