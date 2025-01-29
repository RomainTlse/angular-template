import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Menu } from '../../../interfaces/menu';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidenav-link',
  imports: [NgIcon, RouterLink, NgClass, RouterLinkActive],
  templateUrl: './sidenav-link.component.html',
  styleUrl: './sidenav-link.component.sass',
})
export class SidenavLinkComponent {
  @Input() menu?: Menu;
  @Input() idx?: number;
  @ViewChildren(RouterLinkActive) routerLinks?: QueryList<RouterLinkActive>;

  fatherOpen?: string;
  countActive = 0;

  isAnyChildActive(father = '', idx = -1): boolean {
    const isActive = this.routerLinks?.some((link) => link.isActive) ?? false;

    if (isActive && !this.countActive) {
      this.openFather(father, idx);
      this.countActive++;
    }
    return isActive;
  }

  openFather(father = '', idx = -1) {
    if (idx >= 0) {
      this.fatherOpen = father + idx;
    } else {
      this.fatherOpen = '';
    }
  }
}
