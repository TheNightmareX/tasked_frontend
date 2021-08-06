import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListResult } from '../list-result.dto';
import { TransformerService } from '../transformer.service';

@Injectable()
export class ListInterceptor implements HttpInterceptor {
  constructor(private transformer: TransformerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return new Observable<HttpEvent<unknown>>((observer) => {
      let subscription: Subscription;
      let data: ListResult | undefined;
      let limit: number | undefined;
      let offset: number | undefined;

      const handle = (request: HttpRequest<unknown>) => {
        subscription = next
          .handle(request)
          .pipe(
            map((event) => {
              if (!(event instanceof HttpResponse)) return event;
              const mayBeListBody = event.body as ListResult;
              if (mayBeListBody.total && mayBeListBody.results) {
                data = this.transformer.transform(ListResult, mayBeListBody);
                return event.clone({ body: data });
              } else {
                return event;
              }
            }),
          )
          .subscribe({
            error: (err) => observer.error(err),
            next: (event) => observer.next(event),
            complete: () => {
              // not a list action
              if (!data) return observer.complete();

              if (!limit)
                limit = +(request.params.get('limit') ?? data.results.length);
              if (!offset) offset = +(request.params.get('offset') ?? 0);

              offset += limit;

              // is the last page
              if (offset >= data.total) return observer.complete();

              handle(
                request.clone({
                  setParams: {
                    limit: limit + '',
                    offset: offset + '',
                  },
                }),
              );
            },
          });
      };

      handle(request);
      return () => subscription.unsubscribe();
    });
  }
}
