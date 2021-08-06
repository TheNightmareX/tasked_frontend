import { Expose } from 'class-transformer';
import { BaseEntity } from './base.entity';

export class ListResult<T extends BaseEntity = BaseEntity> {
  @Expose()
  total!: number;

  @Expose()
  results!: T[];
}
