import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgForm,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { map } from 'rxjs/operators';
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
  implements OnInit, AfterViewInit, ControlValueAccessor, Validator
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

  @ViewChild(MatInput)
  private firstInput!: MatInput;

  private onChange = (v: unknown) => {};
  private onTouched = () => {};

  /**
   * `.form.valid` will be `true` when `.validate()` is called first time, but
   * we must return a `false` in the first validation, so here it is.
   */
  private valid = false;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.firstInput.focus();
    });
  }

  ngAfterViewInit() {
    this.form
      .statusChanges!.pipe(map(() => !!this.form.valid))
      .subscribe((valid) => (this.valid = valid));
  }

  propagate() {
    // wait for the validation
    setTimeout(() => {
      this.onChange(this.data);
      this.onTouched();
    });
  }

  validate() {
    return this.valid ? null : { profile: 'error' };
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
