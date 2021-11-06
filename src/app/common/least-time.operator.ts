import { forkJoin, Observable, of, timer } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

const ERROR = Symbol('error');

export const leastTime =
  (time: number) =>
  <T>(source: Observable<T>) =>
    forkJoin([
      source.pipe(catchError((err) => of<ErrorObject>({ [ERROR]: err }))),
      timer(time),
    ]).pipe(
      map(([result]) => result),
      filter((result): result is T => {
        if (ERROR in result) throw (result as ErrorObject)[ERROR];
        return true;
      }),
    );

interface ErrorObject {
  [ERROR]: Error;
}
