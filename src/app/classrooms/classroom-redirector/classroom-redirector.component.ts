import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClassroomListGQL } from 'src/app/graphql';
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
    private listGql: ClassroomListGQL,
  ) {}

  ngOnInit() {
    if (this.storage.lastActiveId)
      this.listGql
        .fetch()
        .pipe(map((result) => result.data.classrooms.results))
        .subscribe((classrooms) => {
          const existsClassroom = classrooms.some(
            (item) => item.id == this.storage.lastActiveId,
          );
          if (!existsClassroom) this.storage.lastActiveId = undefined;
        });

    this.redirect();
  }

  private redirect() {
    const id = this.storage.lastActiveId;
    this.router.navigate(['../', ...(id ? [id] : [])], {
      relativeTo: this.route,
    });
  }
}
