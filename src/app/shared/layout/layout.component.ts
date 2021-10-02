import { Component, OnInit } from '@angular/core';
import { BreakpointsService } from 'src/app/core/breakpoints.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(public breakpoints: BreakpointsService) {}

  ngOnInit() {}
}
