import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Gender, UserFragment } from 'src/app/graphql';

type User = Pick<UserFragment, 'username' | 'nickname'> &
  Partial<Pick<UserFragment, 'gender'>>;

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Input() color = false;
  @HostBinding('class') classList: string[] = [];

  constructor() {}

  ngOnInit() {
    this.updateClassList();
  }

  ngOnChanges() {
    this.updateClassList();
  }

  private updateClassList() {
    if (!this.user?.gender || !this.color) return;
    this.classList =
      this.user.gender == Gender.Male
        ? ['text--blue']
        : this.user.gender == Gender.Female
        ? ['text--pink']
        : [];
  }
}
