import { Component, OnInit } from '@angular/core';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  Gender,
  UserScalarFieldsFragment,
  UserUpdateInput,
} from 'src/app/graphql';
import { UpdateUserGQL } from '../../graphql';
import { FormProfileData } from '../form-profile/form-profile-data.interface';

@Component({
  selector: 'app-layout-profile-dialog-edit',
  templateUrl: './layout-profile-dialog-edit.component.html',
  styleUrls: ['./layout-profile-dialog-edit.component.css'],
})
export class LayoutProfileDialogEditComponent implements OnInit {
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
      .subscribe((user) => {
        this.auth.user = user;
      });
  }

  private cleanData(user: UserScalarFieldsFragment) {
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
