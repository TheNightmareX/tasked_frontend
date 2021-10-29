import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomsLocalStorageService } from '../classrooms-local-storage.service';

@Component({
  selector: 'app-classroom-redirector',
  templateUrl: './classroom-redirector.component.html',
  styleUrls: ['./classroom-redirector.component.css'],
})
export class ClassroomRedirectorComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: ClassroomsLocalStorageService,
  ) {}

  ngOnInit() {
    if (this.storage.lastActiveId)
      this.router.navigate(['../', this.storage.lastActiveId], {
        relativeTo: this.route,
      });
  }
}
