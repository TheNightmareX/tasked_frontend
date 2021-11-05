import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  JoinApplicationListGQL,
  JoinApplicationListQuery,
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
  applicationGroups$!: Observable<[string, Application[]][]>;

  constructor(
    private datePipe: DatePipe,
    private listGql: JoinApplicationListGQL,
  ) {}

  ngOnInit() {
    this.applicationGroups$ = this.listGql.watch().valueChanges.pipe(
      map((result) => result.data.joinApplications.results),
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
}
