import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GENDER_SELECTIONS } from './gender-selection.token';
import { Gender } from '../graphql';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: GENDER_SELECTIONS,
      useValue: [
        { text: 'Male', value: Gender.Male },
        { text: 'Female', value: Gender.Female },
        { text: 'Alien', value: Gender.Unknown },
      ],
    },
  ],
})
export class ConstantsModule {}
