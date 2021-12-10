import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Apollo } from 'apollo-angular';
import { from } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { leastTime } from 'src/app/common/least-time.operator';
import { NotificationType } from 'src/app/common/notification-type.enum';

@Component({
  selector: 'app-refetch-button',
  templateUrl: './refetch-button.component.html',
  styleUrls: ['./refetch-button.component.scss'],
})
export class RefetchButtonComponent implements OnInit {
  loading = false;
  disabled = false;

  constructor(private apollo: Apollo, private notifier: NotifierService) {}

  ngOnInit() {}

  refetch() {
    if (this.disabled) return;
    this.disabled = true;
    this.loading = true;
    from(this.apollo.client.refetchQueries({ include: 'active' }))
      .pipe(
        leastTime(1000),
        tap(() => {
          this.loading = false;
          this.notifier.notify(
            NotificationType.Success,
            $localize`Data refreshed`,
          );
        }),
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
