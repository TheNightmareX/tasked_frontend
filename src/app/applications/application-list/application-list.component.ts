import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import {
  JoinApplicationListGQL,
  JoinApplicationListQuery,
  JoinApplicationListQueryVariables,
} from 'src/app/graphql';

type Application =
  JoinApplicationListQuery['joinApplications']['results'][number];

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
  viewProviders: [DatePipe],
})
export class ApplicationListComponent implements OnInit {
  @Input() scrollableContainer?: HTMLElement;
  applicationGroups$!: Observable<[string, Application[]][]>;
  loading = false;
  allLoaded = false;

  private query!: QueryRef<
    JoinApplicationListQuery,
    JoinApplicationListQueryVariables
  >;

  constructor(
    public auth: AuthService,
    private datePipe: DatePipe,
    private listGql: JoinApplicationListGQL,
  ) {}

  ngOnInit() {
    this.query = this.listGql.watch({ limit: 20 });
    this.applicationGroups$ = this.query.valueChanges.pipe(
      map((result) => result.data.joinApplications),
      tap((data) => (this.allLoaded = data.results.length >= data.total)),
      map((data) => data.results),
      map((items) => {
        const groups: Record<string, Application[]> = {};
        items.forEach((item) => {
          const key = this.datePipe.transform(item.createdAt)!;
          const group = (groups[key] = groups[key] ?? []);
          group.push(item);
        });
        return Object.entries(groups);
      }),
    );
  }

  fetchMore() {
    if (this.allLoaded) return;
    if (this.loading) return;

    const data = this.query.getCurrentResult().data.joinApplications;
    this.loading = true;
    from(this.query.fetchMore({ variables: { offset: data.results.length } }))
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((result) => {
        const scrollTop = this.scrollableContainer?.scrollTop;
        this.query.updateQuery((prev) => ({
          ...prev,
          joinApplications: {
            ...prev.joinApplications,
            results: [
              ...prev.joinApplications.results,
              ...result.data.joinApplications.results,
            ],
          },
        }));
        setTimeout(() => {
          this.scrollableContainer?.scrollTo({ top: scrollTop });
        });
      });
  }
}
