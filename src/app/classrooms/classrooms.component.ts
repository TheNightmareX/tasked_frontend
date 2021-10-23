import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomsLocalStorageService } from './classrooms-local-storage.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})
export class ClassroomsComponent implements OnInit {
  constructor(
    private router: Router,
    private storage: ClassroomsLocalStorageService,
  ) {}

  ngOnInit() {
    if (this.storage.lastActiveId)
      this.router.navigate(['/classrooms', this.storage.lastActiveId]);
  }
}
