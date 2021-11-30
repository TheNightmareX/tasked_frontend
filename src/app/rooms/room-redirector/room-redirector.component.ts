import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { combineLatest } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { RoomListGQL } from 'src/app/graphql';
import { RoomsLocalStorageService } from '../rooms-local-storage.service';

@Component({
  selector: 'app-room-redirector',
  templateUrl: './room-redirector.component.html',
  styleUrls: ['./room-redirector.component.scss'],
})
export class RoomRedirectorComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: RoomsLocalStorageService,
    private auth: AuthService,
    private notifier: NotifierService,
    private listGql: RoomListGQL,
  ) {}

  ngOnInit() {
    combineLatest([
      this.listGql.fetch().pipe(map((result) => result.data.rooms.results)),
      this.auth.user$.pipe(first()),
    ]).subscribe(([rooms, user]) => {
      const map = this.storage.lastActivatedRoomMap;
      if (user!.id in map.value) {
        const exists = rooms.some((item) => item.id == map.value[user!.id]);
        if (exists) {
          this.notifier.notify(
            NotificationType.Info,
            $localize`Navigated to the last accessed room`,
          );
          this.redirect(map.value[user!.id]);
        } else {
          delete map.value[user!.id];
          map.save();
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