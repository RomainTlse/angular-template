import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../services/sidenav.service';
import { Menu } from '../../interfaces/menu';
import { Sidenav } from '../../interfaces/sidenav';
import { NgClass } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { hugeAdd01, hugeRemove01 } from '@ng-icons/huge-icons';
import { SidenavLinkComponent } from './sidenav-link/sidenav-link.component';

@Component({
  selector: 'app-sidenav',
  imports: [NgClass, SidenavLinkComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.sass',
  viewProviders: [
    provideIcons({
      hugeRemove01,
      hugeAdd01,
    }),
  ],
})
export class SidenavComponent {
  show = false;
  menu?: Menu;
  idx = -1;
  islocked = false;
  @ViewChildren(RouterLinkActive) routerLinks?: QueryList<RouterLinkActive>;
  private _sidenavService = inject(SidenavService);
  private _subscription: Subscription;

  constructor() {
    this._subscription = this._sidenavService.sidenavState$.subscribe(
      (state: Sidenav) => {
        this.show = state.show;
        this.menu = state.menu;
        this.idx = state.index;
      }
    );

    this._sidenavService.setIsLocked(false);
  }

  toogleLocked() {
    this.islocked = !this.islocked;
    this._sidenavService.setIsLocked(this.islocked);
  }
}
