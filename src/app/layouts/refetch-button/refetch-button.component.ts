import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { from } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';

@Component({
  selector: 'app-refetch-button',
  templateUrl: './refetch-button.component.html',
  styleUrls: ['./refetch-button.component.scss'],
})
export class RefetchButtonComponent implements OnInit {
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
