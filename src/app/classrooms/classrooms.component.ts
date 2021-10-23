import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../core/local-storage.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})
export class ClassroomsComponent implements OnInit {
  constructor(private router: Router, private storage: LocalStorageService) {}

  ngOnInit() {
    // TODO: re-implement the navigation
  }
}
