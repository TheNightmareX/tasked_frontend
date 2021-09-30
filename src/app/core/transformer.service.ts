import { Injectable, Type } from '@angular/core';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class TransformerService {
  constructor() {}

  transform<T>(type: Type<T>, object: unknown) {
    return plainToClass(type, object, {
      exposeDefaultValues: true,
      excludeExtraneousValues: true,
    });
  }
}
