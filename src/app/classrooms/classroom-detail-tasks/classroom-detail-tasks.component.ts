import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { from, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import {
  ClassroomTaskListGQL,
  ClassroomTaskListQuery,
  ClassroomTaskListQueryVariables,
} from 'src/app/graphql';

type Task = ClassroomTaskListQuery['classroom']['tasks']['results'][number];

@Component({
  selector: 'app-classroom-detail-tasks',
  templateUrl: './classroom-detail-tasks.component.html',
  styleUrls: ['./classroom-detail-tasks.component.css'],
})
export class ClassroomDetailTasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  loading = false;
  allLoaded = false;

  private query!: QueryRef<
    ClassroomTaskListQuery,
    ClassroomTaskListQueryVariables
  >;

  constructor(
    private route: ActivatedRoute,
    private listGql: ClassroomTaskListGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    this.query = this.listGql.watch({ id });
    this.tasks$ = this.query.valueChanges.pipe(
      map((result) => result.data.classroom.tasks),
      tap(({ results, total }) => (this.allLoaded = results.length >= total)),
      map(({ results }) => results),
    );
  }

  identifyTask(index: number, task: Task) {
    return task.id;
  }

  fetchMore() {
    if (this.allLoaded || this.loading) return;

    const current = this.query.getCurrentResult().data.classroom.tasks;
    this.loading = true;
    from(
      this.query.fetchMore({ variables: { offset: current.results.length } }),
    )
      .pipe(
        map((result) => result.data.classroom.tasks),
        finalize(() => (this.loading = false)),
      )
      .subscribe(({ results, total }) => {
        this.query.updateQuery((prev) => ({
          ...prev,
          classroom: {
            ...prev.classroom,
            tasks: {
              ...prev.classroom.tasks,
              total,
              results: [...prev.classroom.tasks.results, ...results],
            },
          },
        }));
      });
  }
}
