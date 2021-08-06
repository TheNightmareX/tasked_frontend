import { Expose } from 'class-transformer';
import { Gender } from './gender.enum';

export class UserCreateDto {
  @Expose()
  username!: string;

  @Expose()
  nickname?: string;

  @Expose()
  password!: string;

  @Expose()
  gender?: Gender;
}
