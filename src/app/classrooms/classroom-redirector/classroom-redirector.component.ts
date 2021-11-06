import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { ClassroomListGQL } from 'src/app/graphql';
import { ClassroomsLocalStorageService } from '../classrooms-local-storage.service';

@Component({
  selector: 'app-classroom-redirector',
  templateUrl: './classroom-redirector.component.html',
  styleUrls: ['./classroom-redirector.component.css'],
})
export class ClassroomRedirectorComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: ClassroomsLocalStorageService,
    private auth: AuthService,
    private notifier: NotifierService,
    private listGql: ClassroomListGQL,
  ) {}

  ngOnInit() {
    combineLatest([
      this.listGql
        .fetch()
        .pipe(map((result) => result.data.classrooms.results)),
      this.auth.user$.pipe(first()),
    ]).subscribe(([classrooms, user]) => {
      const map = this.storage.lastActivatedClassroomMap;
      if (user!.id in map) {
        const exists = classrooms.some((item) => item.id == map[user!.id]);
        if (exists) {
          this.notifier.notify(
            NotificationType.Info,
            'Navigated to the last accessed classroom',
          );
          this.redirect(map[user!.id]);
        } else {
          delete map[user!.id];
          this.redirect();
        }
      } else {
        this.redirect();
      }
    });
  }

  private redirect(id?: string) {
    this.router.navigate(['../', ...(id ? [id] : [])], {
      relativeTo: this.route,
    });
  }
}
