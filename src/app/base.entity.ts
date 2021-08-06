import { Expose, Type } from 'class-transformer';

export class BaseEntity {
  @Expose()
  id!: number;

  @Type()
  @Expose()
  createdAt!: Date;

  @Type()
  @Expose()
  updatedAt!: Date;
}
