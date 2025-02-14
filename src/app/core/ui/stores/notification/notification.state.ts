import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddNotification,
  LoadNotifications,
  RemoveNotificationAction,
  UpdateNotificationAction,
} from './notification.actions';
import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';

export interface NotificationStateModel {
  notifications: Notification[];
  notificationCount: number;
}

@State<NotificationStateModel>({
  name: 'notifications',
  defaults: {
    notifications: [],
    notificationCount: 0,
  },
})
@Injectable()
export class NotificationState {
  private _notificationService = inject(NotificationService);

  @Selector()
  static getState(state: NotificationStateModel) {
    return state;
  }

  // Sélecteur pour récupérer toutes les notifications
  @Selector()
  static getAllNotifications(state: NotificationStateModel): Notification[] {
    return state.notifications;
  }

  // Sélecteur pour récupérer les notifications ouvertes
  @Selector()
  static getOpenNotifications(state: NotificationStateModel): Notification[] {
    return state.notifications.filter((notification) => notification.is_open);
  }

  // Sélecteur pour récupérer les notifications fermées
  @Selector()
  static getClosedNotifications(state: NotificationStateModel): Notification[] {
    return state.notifications.filter((notification) => !notification.is_open);
  }

  // Sélecteur pour récupérer les notifications d'un type spécifique
  /*    @Selector()
      static getNotificationsByType(
        state: NotificationStateModel,
        typeId: number
      ): Notification[] {
        return state.notifications.filter(
          (notification) => notification.type.id === typeId
        );
      }*/

  @Action(LoadNotifications)
  loadNotifications(ctx: StateContext<NotificationStateModel>) {
    return this._notificationService
      .getNotifications()
      .subscribe((notifications) => {
        ctx.setState({
          notifications: notifications,
          notificationCount: notifications.length,
        });
      });
  }

  @Action(AddNotification)
  addNotification(
    { getState, patchState }: StateContext<NotificationStateModel>,
    { notification }: AddNotification
  ) {
    const state = getState();
    const updatedNotifications = [...state.notifications, notification];
    patchState({
      notifications: updatedNotifications,
      notificationCount: updatedNotifications.length,
    });
  }

  @Action(RemoveNotificationAction)
  removeNotification(
    ctx: StateContext<NotificationStateModel>,
    action: RemoveNotificationAction
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      notifications: state.notifications.filter(
        (notification) => notification.id !== action.notificationId
      ),
    });
  }

  @Action(UpdateNotificationAction)
  updateNotification(
    ctx: StateContext<NotificationStateModel>,
    action: UpdateNotificationAction
  ) {
    const state = ctx.getState();
    const notifications = state.notifications.map((notification) =>
      notification.id === action.notification.id
        ? action.notification
        : notification
    );
    ctx.setState({
      ...state,
      notifications,
    });
  }
}
