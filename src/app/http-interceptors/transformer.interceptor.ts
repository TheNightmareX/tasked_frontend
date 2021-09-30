import {
  HttpContextToken,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseEntity } from '../base.entity';
import { TransformerService } from '../core/transformer.service';
import { ListResult } from '../list-result.dto';

export const TRANSFORM = new HttpContextToken<Type<BaseEntity> | null>(
  () => null,
);

@Injectable()
export class TransformerInterceptor implements HttpInterceptor {
  constructor(private transformer: TransformerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const type = request.context.get(TRANSFORM);
    const response$ = next.handle(request);
    if (type) {
      return response$.pipe(
        map((event) => {
          if (!(event instanceof HttpResponse)) return event;
          let response = event;
          if ((response.body as BaseEntity).id)
            response = response.clone({
              body: this.transformer.transform(type, response.body),
            });
          if (response.body instanceof ListResult)
            response.body.results = response.body.results.map((entity) =>
              this.transformer.transform(type, entity),
            );
          return response;
        }),
      );
    } else {
      return response$;
    }
  }
}
