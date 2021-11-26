import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { from } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';

@Component({
  selector: 'app-layout-main-refetch-button',
  templateUrl: './layout-main-refetch-button.component.html',
  styleUrls: ['./layout-main-refetch-button.component.scss'],
})
export class LayoutMainRefetchButtonComponent implements OnInit {
  loading = false;
  disabled = false;

  constructor(private apollo: Apollo) {}

  ngOnInit() {}

  refetch() {
    if (this.disabled) return;
    this.disabled = true;
    this.loading = true;
    from(this.apollo.client.refetchQueries({ include: 'active' }))
      .pipe(
        leastTime(1000),
        tap(() => (this.loading = false)),
        leastTime(3000),
        tap(() => (this.disabled = false)),
        finalize(() => {
          this.loading = false;
          this.disabled = false;
        }),
      )
      .subscribe();
  }
}
