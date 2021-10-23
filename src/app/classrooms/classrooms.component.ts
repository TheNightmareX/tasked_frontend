import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomsStateService } from './classrooms-state.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})
export class ClassroomsComponent implements OnInit {
  constructor(private router: Router, private state: ClassroomsStateService) {}

  ngOnInit() {
    if (this.state.activeId)
      this.router.navigate(['/classrooms', this.state.activeId]);
  }
}
