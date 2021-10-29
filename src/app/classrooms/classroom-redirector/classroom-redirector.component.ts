import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs/operators';
import { ClassroomListGQL } from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';
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
    private notifier: NotifierService,
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
    if (id)
      this.notifier.notify(
        NotificationType.Info,
        'Last accessed classroom found',
      );
  }
}
