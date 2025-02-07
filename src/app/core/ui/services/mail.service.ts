import { inject, Injectable } from '@angular/core';
import { HttpRequestService } from '../../utils/services/http-request.service';
import { Observable } from 'rxjs';
import { Mail } from '../interfaces/mail';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private _apiUrl = 'http://localhost:3000/mails';
  private _httpRequestService = inject(HttpRequestService);

  getMails(): Observable<Mail[]> {
    return this._httpRequestService.getDatas(this._apiUrl);
  }

  getMailById(id: number): Observable<Mail> {
    return this._httpRequestService.getById(this._apiUrl, id);
  }

  addMail(post: Mail): Observable<Mail> {
    return this._httpRequestService.postDatas(this._apiUrl, post);
  }

  updateMail(id: number, post: Mail): Observable<Mail> {
    return this._httpRequestService.updateDatas(this._apiUrl, id, post);
  }

  deleteMail(id: number): Observable<unknown> {
    return this._httpRequestService.deleteDatas(this._apiUrl, id);
  }
}
