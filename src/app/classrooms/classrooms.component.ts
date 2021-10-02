import { Component, OnInit } from '@angular/core';
import { BreakpointsService } from '../core/breakpoints.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})
export class ClassroomsComponent implements OnInit {
  constructor(public breakpoints: BreakpointsService) {}

  ngOnInit() {}
}
