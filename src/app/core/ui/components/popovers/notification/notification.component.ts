import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  hugeCalendarAdd01,
  hugeFileAdd,
  hugeUserAdd02,
} from '@ng-icons/huge-icons';
import { NgScrollbar } from 'ngx-scrollbar';
import { Divider } from 'primeng/divider';
import { Notification } from '../../../interfaces/notification';
import { Store } from '@ngxs/store';
import { LoadNotifications } from '../../../stores/notification/notification.actions';
import { NotificationState } from '../../../stores/notification/notification.state';
import { AsyncPipe } from '@angular/common';
import { DatetimeService } from '../../../../utils/services/datetime.service';
import { Observable } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  imports: [Button, NgIcon, NgScrollbar, Divider, AsyncPipe, TranslatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.sass',
  viewProviders: [
    provideIcons({
      hugeUserAdd02,
      hugeCalendarAdd01,
      hugeFileAdd,
    }),
  ],
})
export class NotificationComponent {
  notifications$: Observable<Notification[]>;
  notificationCount = 0;

  protected datetimeService = inject(DatetimeService);

  constructor(private store: Store) {
    this.store.dispatch(new LoadNotifications());
    this.notifications$ = this.store.select(
      NotificationState.getAllNotifications
    );

    this.store
      .select((state) => state.notifications.notificationCount)
      .subscribe((count) => (this.notificationCount = count ?? 0));
  }
}
