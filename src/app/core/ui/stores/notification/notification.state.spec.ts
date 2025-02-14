import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import {
  NotificationState,
  NotificationStateModel,
} from './notification.state';
import { AddNotification } from './notification.actions';
import { provideHttpClient } from '@angular/common/http';

describe('Notification store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideStore([NotificationState])],
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: NotificationStateModel = {
      notifications: [
        {
          id: 1,
          title: 'Ma Notification',
          description: 'La description de la notification',
          dt_created: new Date('02/03/2025 14:35:22'),
          is_open: true,
          type: {
            id: 1,
            name: 'New User',
            classCss: 'notification--new-user',
            icon: 'hugeUserAdd02',
          },
        },
      ],
      notificationCount: 1,
    };
    store.dispatch(
      new AddNotification({
        id: 1,
        title: 'Ma Notification',
        description: 'La description de la notification',
        dt_created: new Date('02/03/2025 14:35:22'),
        is_open: true,
        type: {
          id: 1,
          name: 'New User',
          classCss: 'notification--new-user',
          icon: 'hugeUserAdd02',
        },
      })
    );
    const actual = store.selectSnapshot(NotificationState.getState);
    expect(actual).toEqual(expected);
  });
});
