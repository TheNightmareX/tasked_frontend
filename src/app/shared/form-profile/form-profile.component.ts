import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Gender } from 'src/app/graphql';
import { FormProfileData } from './form-profile-data.interface';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormProfileComponent,
      multi: true,
    },
  ],
})
export class FormProfileComponent implements OnInit, ControlValueAccessor {
  data: FormProfileData = {
    username: '',
    password: '',
    passwordConfirm: '',
    gender: Gender.Unknown,
  };

  genderSelections = [
    { text: 'Male', value: Gender.Male },
    { text: 'Female', value: Gender.Female },
    { text: 'Alien', value: Gender.Unknown },
  ];

  @Input()
  update: boolean = false;

  private onChange = (v: unknown) => {};
  private onTouched = () => {};

  constructor() {}

  ngOnInit() {}

  propagate() {
    this.onChange(this.data);
    this.onTouched();
  }

  writeValue(data: FormProfileComponent) {
    Object.assign(this.data, data);
  }

  registerOnChange(fn: (v: unknown) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
