import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { ClassroomListGQL } from 'src/app/graphql';
import { NotificationType } from 'src/app/notification-type.enum';
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
      this.auth.user$.pipe(take(1)),
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
          this.notifier.notify(
            NotificationType.Warning,
            'Failed to navigate to the last accessed classroom',
          );
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
