import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { NotificationType } from 'src/app/common/notification-type.enum';
import { RoomCreateGQL, RoomListGQL } from 'src/app/graphql';

@Component({
  selector: 'app-room-creation',
  templateUrl: './room-creation.component.html',
  styleUrls: ['./room-creation.component.scss'],
})
export class RoomCreationComponent implements OnInit {
  data = {
    name: '',
    description: '',
  };

  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifierService,
    private createGql: RoomCreateGQL,
    private listGql: RoomListGQL,
  ) {}

  ngOnInit() {}

  submit() {
    this.loading = true;
    this.createGql
      .mutate(
        { data: this.data },
        {
          update: (_, result) => {
            const query = this.listGql.watch();
            query.updateQuery((prev) => ({
              ...prev,
              rooms: {
                ...prev.rooms,
                total: prev.rooms.total + 1,
                results: [...prev.rooms.results, result.data!.createRoom],
              },
            }));
          },
        },
      )
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe(
        (result) => {
          this.notifier.notify(
            NotificationType.Success,
            $localize`Room created successfully`,
          );
          this.router.navigate(['/app/rooms', result.data!.createRoom.id], {
            relativeTo: this.route,
          });
        },
        () => {
          this.notifier.notify(
            NotificationType.Error,
            $localize`Failed to create the room`,
          );
        },
      );
  }
}
