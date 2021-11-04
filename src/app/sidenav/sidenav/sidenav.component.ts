import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
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
