import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { GENDER_SELECTIONS } from 'src/app/constants/gender-selection.token';
import { Gender } from 'src/app/graphql';
import { Selection } from 'src/app/selection.interface';
import { FormProfileData } from './form-profile-data.interface';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.css'],
})
export class FormProfileComponent implements OnInit {
  @Input()
  data: FormProfileData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };
  @Output()
  dataChange = new EventEmitter<FormProfileData>();

  @Input()
  update: boolean = false;

  constructor(
    @Inject(GENDER_SELECTIONS) public genderSelections: Selection[],
  ) {}

  ngOnInit() {}
}
