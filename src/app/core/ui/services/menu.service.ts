import { inject, Injectable } from '@angular/core';
import { HttpRequestService } from '../../utils/services/http-request.service';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _apiUrl = 'http://localhost:3000/menus';
  private _httpRequestService = inject(HttpRequestService);

  getMenus(): Observable<Menu[]> {
    return this._httpRequestService.getDatas(this._apiUrl);
  }

  getMenuById(id: number): Observable<Menu> {
    return this._httpRequestService.getById(this._apiUrl, id);
  }

  addMenu(post: Menu): Observable<Menu> {
    return this._httpRequestService.postDatas(this._apiUrl, post);
  }

  updateMenu(id: number, post: Menu): Observable<Menu> {
    return this._httpRequestService.updateDatas(this._apiUrl, id, post);
  }

  deleteMenu(id: number): Observable<unknown> {
    return this._httpRequestService.deleteDatas(this._apiUrl, id);
  }
}
