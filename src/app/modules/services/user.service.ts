import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../../core/utils/services/http-request.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/user';
  private _httpRequestService = inject(HttpRequestService);

  constructor() {}

  /**
   * List of users
   */
  getUsers(): Observable<User[]> {
    return this._httpRequestService.getDatas<User[]>(this.apiUrl);
  }

  /**
   * Get user by id
   * @return Observable<User>
   * @param id
   */
  getUserById(id: number): Observable<User> {
    return this._httpRequestService.getById<User>(`this.apiUrl/${id}`);
  }

  /**
   * Create a new user
   * @param user
   * @return Observable<User>
   */
  addUser(user: User): Observable<User> {
    return this._httpRequestService.postDatas<User>(this.apiUrl, user);
  }

  /**
   * Update user by id
   * @param user
   * @return Observable<User>
   */
  updateUser(user: User): Observable<User> {
    return this._httpRequestService.updateDatas<User>(
      `this.apiUrl/${user.id}`,
      user
    );
  }

  /**
   * Delete user by id
   * @param id
   */
  deleteUser(id: number): Observable<unknown> {
    return this._httpRequestService.deleteDatas(`this.apiUrl/${id}`);
  }
}
