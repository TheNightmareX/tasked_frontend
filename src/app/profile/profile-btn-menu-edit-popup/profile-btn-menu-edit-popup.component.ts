import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';
import { NotifierService } from 'angular-notifier';
import dayjs, { Dayjs } from 'dayjs';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { BreakpointsService } from 'src/app/core/breakpoints.service';
import { FormDataService } from 'src/app/core/form-data.service';
import {
  Gender,
  UserFragment,
  UserUpdateGQL,
  UserUpdateInput,
} from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';
import { ProfileFormData } from '../profile-form/profile-form-data.interface';

@Component({
  selector: 'app-profile-btn-menu-edit-popup',
  templateUrl: './profile-btn-menu-edit-popup.component.html',
  styleUrls: ['./profile-btn-menu-edit-popup.component.css'],
})
export class ProfileBtnMenuEditPopupComponent implements OnInit {
  @HostBinding('class.dialog')
  hostClassDialog?: boolean;

  @Output()
  update = new EventEmitter();

  data: ProfileFormData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };

  qualifiedDate$!: Observable<Dayjs>;
  canUpdate$!: Observable<boolean>;

  constructor(
    public auth: AuthService,
    public breakpoints: BreakpointsService,
    private notifier: NotifierService,
    private formDataService: FormDataService,
    private userUpdateGql: UserUpdateGQL,
  ) {}

  ngOnInit() {
    this.breakpoints.phone$.pipe(take(1)).subscribe((isPhone) => {
      this.hostClassDialog = !isPhone;
    });
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
      this.userUpdateGql.mutate({ id, data }).subscribe(
        () => {
          this.notifier.notify(
            NotificationType.Success,
            'Profile updated successfully',
          );
          this.update.emit();
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            'Failed to update the profile',
          );
        },
      );
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
