import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomTaskListGQL, ClassroomTaskListQuery } from 'src/app/graphql';

type Task = ClassroomTaskListQuery['classroom']['tasks']['results'][number];

@Component({
  selector: 'app-classroom-detail-tasks',
  templateUrl: './classroom-detail-tasks.component.html',
  styleUrls: ['./classroom-detail-tasks.component.css'],
})
export class ClassroomDetailTasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  constructor(
    private route: ActivatedRoute,
    private listGql: ClassroomTaskListGQL,
  ) {}

  ngOnInit() {
    const id = this.route.parent!.snapshot.paramMap.get('id')!;
    this.tasks$ = this.listGql
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.classroom.tasks.results));
  }

  identifyTask(index: number, task: Task) {
    return task.id;
  }
}
