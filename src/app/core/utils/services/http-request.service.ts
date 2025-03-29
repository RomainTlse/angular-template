import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private _http: HttpClient) {}

  /**
   * Get All datas or a spécific data
   * @param route
   * @param params
   */
  public getDatas<T>(route: string, params?: HttpParams): Observable<T> {
    if (params) {
      return this._http.get<T>(route, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.get<T>(route, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * GET by id
   * @param route
   * @param params
   */
  public getById<T>(route: string, params?: HttpParams): Observable<T> {
    if (params) {
      return this._http.get<T>(route, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.get<T>(route, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Post datas
   * @param route
   * @param datasToPost
   * @param params
   */
  public postDatas<T>(
    route: string,
    datasToPost: T,
    params?: HttpParams
  ): Observable<T> {
    if (params) {
      return this._http.post<T>(route, datasToPost, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.post<T>(route, datasToPost, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * Delete id datas
   * @param route
   * @param params
   */
  public deleteDatas(route: string, params?: HttpParams): Observable<unknown> {
    if (params) {
      return this._http.delete(route, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.delete(route, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  /**
   * PUT datas
   * @param route
   * @param datasToPut
   * @param params
   */
  public updateDatas<T>(
    route: string,
    datasToPut: T,
    params?: HttpParams
  ): Observable<T> {
    if (params) {
      return this._http.put<T>(route, datasToPut, {
        params: params,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      });
    }
    return this._http.put<T>(route, datasToPut, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
