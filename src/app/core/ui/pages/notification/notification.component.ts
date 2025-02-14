import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../../interfaces/notification';
import {
  AddNotification,
  LoadNotifications,
  RemoveNotificationAction,
  UpdateNotificationAction,
} from '../../stores/notification/notification.actions';
import { AsyncPipe, NgClass } from '@angular/common';
import { NotificationState } from '../../stores/notification/notification.state';
import { Store } from '@ngxs/store';
import { Badge } from 'primeng/badge';

@Component({
  selector: 'app-notification',
  imports: [AsyncPipe, NgClass, Badge],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.sass',
})
export class NotificationComponent {
  notifications$: Observable<Notification[]>;
  notificationCount = 0;

  constructor(private store: Store) {
    this.store.dispatch(new LoadNotifications());
    this.notifications$ = this.store.select(
      NotificationState.getAllNotifications
    );
    this.store
      .select((state) => state.notifications.notificationCount)
      .subscribe((count) => (this.notificationCount = count ?? 0));
  }

  addNotification() {
    const newNotification: Notification = {
      id: Date.now(),
      title: 'New Notification',
      description: 'This is a new notification.',
      dt_created: new Date(),
      is_open: true,
      type: {
        id: 1,
        name: 'Success',
        classCss: 'success',
        icon: 'check-circle',
      },
    };
    this.store.dispatch(new AddNotification(newNotification));
  }

  removeNotification(notificationId: number) {
    this.store.dispatch(new RemoveNotificationAction(notificationId));
  }

  updateNotification(notification: Notification) {
    notification.is_open = false; // Simulate closing
    this.store.dispatch(new UpdateNotificationAction(notification));
  }
}
