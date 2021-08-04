import { Gender } from './gender.enum';

export interface UserCreateDto {
  username: string;
  nickname?: string;
  password: string;
  gender?: Gender;
}
