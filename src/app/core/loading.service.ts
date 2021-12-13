import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  get count() {
    return this._count;
  }
  set count(v: number) {
    if (v < 0) throw new Error();
    this._count = v;
    this.next();
  }
  private _count!: number;

  value$;
  private _value$ = new ReplaySubject<boolean>(1);

  constructor() {
    this.count = 0;
    this.value$ = this._value$.asObservable();
  }

  private next() {
    this._value$.next(!!this.count);
  }
}
