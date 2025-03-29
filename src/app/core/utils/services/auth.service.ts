import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpRequestService } from './http-request.service';
import { User } from '../../../modules/interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUrlLogin = '/api/auth/login'; // URL de ton API NestJS
  private _authUrlRegister = '/api/auth/register'; // URL de ton API NestJS
  private _authUrlForgotPassword = '/api/auth/forgot-pwd'; // URL de ton API NestJS
  private _authUrlNewPassword = '/api/auth/new-pwd'; // URL de ton API NestJS
  private _currentTokenSubject$: BehaviorSubject<any> =
    new BehaviorSubject<any>(null);
  private _httpClient = inject(HttpClient);
  private _httpRequestService = inject(HttpRequestService);
  private _router = inject(Router);

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  set token(token: string) {
    localStorage.setItem('access_token', token);
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  get currentUser(): User | null {
    if (localStorage.getItem('currentUser') !== null) {
      return JSON.parse(localStorage.getItem('currentUser') as string) as User;
    }
    return null;
  }

  set currentUser(currentUser: User) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<any>(this._authUrlLogin, { email, password })
      .pipe(
        tap((response) => {
          if (response.access_token) {
            this.token = response.access_token;
            this._currentTokenSubject$.next(response.access_token);
            this.currentUser = response.user;
          }
        })
      );
  }

  register(
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string
  ): Observable<any> {
    return this._httpRequestService.postDatas<any>(this._authUrlRegister, {
      email,
      password,
      username,
      firstname,
      lastname,
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this._currentTokenSubject$.next(null);
    this._router.navigate(['/login']);
  }

  forgotPassword(email: string) {
    return this._httpClient.post<any>(this._authUrlForgotPassword, { email });
  }

  newPassword(password: string, token: string) {
    return this._httpClient.post<any>(this._authUrlNewPassword, {
      password,
      token,
    });
  }
}
