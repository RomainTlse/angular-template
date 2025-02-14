import { Notification } from '../../interfaces/notification';

export class LoadNotifications {
  static readonly type = '[Notification] Load Notifications';
}

export class AddNotification {
  static readonly type = '[Notification] Add notification';

  constructor(readonly notification: Notification) {}
}

export class RemoveNotificationAction {
  static readonly type = '[Notification] Remove notification';

  constructor(readonly notificationId: number) {}
}

export class UpdateNotificationAction {
  static readonly type = '[Notification] Update';

  constructor(public notification: Notification) {}
}
