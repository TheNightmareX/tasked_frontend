import { Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';
import { Gender } from './gender.enum';

export class User extends BaseEntity {
  @Expose()
  username!: string;

  @Expose()
  nickname!: string | null;

  @Expose()
  gender!: Gender;
}
