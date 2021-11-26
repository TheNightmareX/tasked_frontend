import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-main-sidenav',
  templateUrl: './layout-main-sidenav.component.html',
  styleUrls: ['./layout-main-sidenav.component.scss'],
})
export class LayoutMainSidenavComponent implements OnInit {
  items: Item[] = [];

  constructor() {}

  ngOnInit() {
    this.items = [
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
