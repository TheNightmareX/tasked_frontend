import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  NgForm,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';
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
    {
      provide: NG_VALIDATORS,
      useExisting: FormProfileComponent,
      multi: true,
    },
  ],
})
export class FormProfileComponent
  implements OnInit, ControlValueAccessor, Validator
{
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

  @ViewChild(NgForm)
  private form!: NgForm;

  private onChange = (v: unknown) => {};
  private onTouched = () => {};

  constructor() {}

  ngOnInit() {}

  propagate() {
    // wait for the validation
    setTimeout(() => {
      this.onChange(this.data);
      this.onTouched();
    });
  }

  validate() {
    // It takes some time for the `.valid` to initialize to `false` while
    // `.touched` is `false` by default.
    return this.form.touched && this.form.valid ? null : { profile: 'error' };
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
