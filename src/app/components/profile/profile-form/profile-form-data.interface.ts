import { Gender } from 'src/app/graphql';

export interface ProfileFormData {
  username: string;
  nickname?: string;
  password: string;
  passwordConfirm: string;
  gender: Gender;
}
