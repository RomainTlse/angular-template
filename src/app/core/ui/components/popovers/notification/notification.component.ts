import { Component, inject, OnInit } from '@angular/core';
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
import { DatetimeService } from '../../../../utils/services/datetime.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [Button, NgIcon, NgScrollbar, Divider],
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
export class NotificationComponent implements OnInit {
  notifications?: Notification[];
  private _datetimeService = inject(DatetimeService);
  private _notificationService = inject(NotificationService);

  ngOnInit() {
    this._notificationService
      .getNotifications()
      .subscribe((notifications: Notification[]) => {
        this.notifications = notifications;
        this.notifications.forEach((notification) => {
          notification.timeDifference =
            this._datetimeService.getDateTimeDifference(
              notification.dt_created
            );
        });
      });
  }
}
