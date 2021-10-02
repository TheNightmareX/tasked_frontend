import { Component, OnInit } from '@angular/core';
import { BreakpointsService } from './core/breakpoints.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private breakpoints: BreakpointsService) {}

  ngOnInit() {
    // this.breakpoints.init();
  }
}
