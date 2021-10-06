import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gender } from 'src/app/graphql';
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

  genderSelections = [
    { text: 'Male', value: Gender.Male },
    { text: 'Female', value: Gender.Female },
    { text: 'Alien', value: Gender.Unknown },
  ];

  constructor() {}

  ngOnInit() {}
}
