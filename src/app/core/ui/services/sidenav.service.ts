import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Menu } from '../interfaces/menu';
import { Sidenav } from '../interfaces/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _sidenav: Subject<Sidenav> = new Subject<Sidenav>();
  public sidenavState$ = this._sidenav.asObservable();
  private _isLocked: Subject<boolean> = new Subject<boolean>();
  public isLockedState$ = this._isLocked.asObservable();

  public show(index: number, menu: Menu): void {
    this._sidenav.next({ show: true, index, menu } as Sidenav);
  }

  public hide(): void {
    this._sidenav.next({ show: false, index: -1, menu: {} } as Sidenav);
  }

  public setIsLocked(isLocked: boolean): void {
    this._isLocked.next(isLocked);
  }
}
