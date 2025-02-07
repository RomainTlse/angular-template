import { inject, Injectable } from '@angular/core';
import { HttpRequestService } from '../../utils/services/http-request.service';
import { Observable } from 'rxjs';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _apiUrl = 'http://localhost:3000/notifications';
  private _httpRequestService = inject(HttpRequestService);

  getNotifications(): Observable<Notification[]> {
    return this._httpRequestService.getDatas(this._apiUrl);
  }

  getNotificationById(id: number): Observable<Notification> {
    return this._httpRequestService.getById(this._apiUrl, id);
  }

  addNotification(post: Notification): Observable<Notification> {
    return this._httpRequestService.postDatas(this._apiUrl, post);
  }

  updateNotification(id: number, post: Notification): Observable<Notification> {
    return this._httpRequestService.updateDatas(this._apiUrl, id, post);
  }

  deleteNotification(id: number): Observable<unknown> {
    return this._httpRequestService.deleteDatas(this._apiUrl, id);
  }
}
