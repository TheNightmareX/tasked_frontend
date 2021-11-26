import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassroomDetailGQL, ClassroomDetailQuery } from 'src/app/graphql';

type Classroom = ClassroomDetailQuery['classroom'];

@Component({
  selector: 'app-classroom-detail-sidebar',
  templateUrl: './classroom-detail-sidebar.component.html',
  styleUrls: ['./classroom-detail-sidebar.component.scss'],
})
export class ClassroomDetailSidebarComponent implements OnInit {
  classroom$!: Observable<Classroom>;

  constructor(
    private route: ActivatedRoute,
    private classroomGql: ClassroomDetailGQL,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')!;
      this.classroom$ = this.classroomGql
        .watch({ id })
        .valueChanges.pipe(map((result) => result.data.classroom));
    });
  }
}
