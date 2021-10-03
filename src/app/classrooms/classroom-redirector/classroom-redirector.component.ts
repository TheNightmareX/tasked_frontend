import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomsStateService } from 'src/app/core/classrooms-state.service';

@Component({
  selector: 'app-classroom-redirector',
  templateUrl: './classroom-redirector.component.html',
  styleUrls: ['./classroom-redirector.component.css'],
})
export class ClassroomRedirectorComponent implements OnInit {
  constructor(private router: Router, private state: ClassroomsStateService) {}

  ngOnInit() {
    if (this.state.activeId)
      this.router.navigate(['/classrooms', this.state.activeId]);
    else {
      // TODO: do something
    }
  }
}
