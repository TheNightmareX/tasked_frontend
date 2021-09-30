import { Injectable, Type } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule,
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
