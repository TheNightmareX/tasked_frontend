import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ClassroomsStateService } from 'src/app/core/classrooms-state.service';

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css'],
})
export class ClassroomDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private state: ClassroomsStateService,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((value): value is string => !!value),
        map((value) => +value),
      )
      .subscribe((classroomId) => {
        this.state.activeId = classroomId;
      });
  }
}
