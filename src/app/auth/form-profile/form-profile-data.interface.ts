import { Gender } from 'src/app/graphql';

export interface FormProfileData {
  username: string;
  nickname?: string;
  password: string;
  passwordConfirm: string;
  gender: Gender;
}
