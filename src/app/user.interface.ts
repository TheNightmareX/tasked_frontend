import { Gender } from './gender.enum';

export interface User {
  id: number;
  username: string;
  nickname: string | null;
  gender: Gender;
  updatedAt: string;
  createdAt: string;
}
