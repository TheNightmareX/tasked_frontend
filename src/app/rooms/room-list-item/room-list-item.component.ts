import { Component, Input, OnInit } from '@angular/core';
import { RoomListQuery } from 'src/app/graphql';

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss'],
})
export class RoomListItemComponent implements OnInit {
  @Input() room?: Room;

  constructor() {}

  ngOnInit() {}
}

type Room = RoomListQuery['rooms']['results'][number];
