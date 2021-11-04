import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-main-sidenav',
  templateUrl: './layout-main-sidenav.component.html',
  styleUrls: ['./layout-main-sidenav.component.css'],
})
export class LayoutMainSidenavComponent implements OnInit {
  items: Item[] = [];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        title: 'Tasks',
        route: '/tasks',
        icon: 'task',
      },
      {
        title: 'Applications',
        route: '/applications',
        icon: 'person_add_alt_1',
      },
    ];
  }
}

interface Item {
  title: string;
  route: string;
  icon: string;
}
