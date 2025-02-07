import { Component, inject, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  hugeAdd01,
  hugeArrowRight01,
  hugeCalendar03,
  hugeDashboardCircle,
  hugeDatabase01,
  hugeGridTable,
  hugeHome03,
  hugeMapsCircle01,
  hugeRemove01,
} from '@ng-icons/huge-icons';
import { Menu } from '../../interfaces/menu';
import { Tooltip } from 'primeng/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavService } from '../../services/sidenav.service';
import { NgClass } from '@angular/common';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  imports: [
    Tooltip,
    NgIcon,
    RouterLink,
    SidenavComponent,
    RouterLinkActive,
    NgClass,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass',
  viewProviders: [
    provideIcons({
      hugeHome03,
      hugeDashboardCircle,
      hugeMapsCircle01,
      hugeGridTable,
      hugeCalendar03,
      hugeDatabase01,
      hugeArrowRight01,
      hugeRemove01,
      hugeAdd01,
    }),
  ],
})
export class MenuComponent implements OnInit {
  menus?: Menu[];
  categoryUrls: { categoryName: string; urls: string[] }[] = [];
  isLocked = false;

  private _menuService = inject(MenuService);
  private _sidenavService = inject(SidenavService);
  private _router = inject(Router);

  ngOnInit() {
    this._menuService.getMenus().subscribe((menus: Menu[]) => {
      this.menus = menus;
      this.categoryUrls = this.getCategoriesWithUrls();
    });
  }

  showSidenav(index: number, menu: Menu): void {
    this._sidenavService.show(index, menu);
  }

  hideSidenav(): void {
    if (!this.isLocked) {
      this._sidenavService.hide();
    }
  }

  isActive(categoryName = ''): boolean {
    const category = this.categoryUrls.find(
      (category) => category.categoryName === categoryName
    );
    return category?.urls.includes(this._router.url) ?? false;
  }

  // Méthode pour récupérer un tableau des catégories et leurs URLs
  getCategoriesWithUrls(): { categoryName: string; urls: string[] }[] {
    const result: { categoryName: string; urls: string[] }[] = [];

    // Parcours des dashboards pour chercher les catégories
    this.menus?.forEach((menu) => {
      // Si le menu a des menus, les ajouter au résultat
      if (menu.menus && menu.name) {
        result.push({
          categoryName: menu.name,
          urls: this.extractUrls(menu.menus),
        });
      }

      // Si le menu a des sous-catégories (categories), on les parcourt
      if (menu.categories) {
        let categoryUrls: string[] = [];
        menu.categories.forEach((category) => {
          // On récupère les URLs de cette catégorie principale
          categoryUrls = categoryUrls.concat(
            this.extractUrls(category.menus || [])
          );
        });
        if (menu.name) {
          result.push({
            categoryName: menu.name,
            urls: categoryUrls,
          });
        }
      }
    });

    return result;
  }

  // Méthode auxiliaire pour extraire les URLs des menus
  private extractUrls(menus: Menu[]): string[] {
    let urls: string[] = [];

    menus.forEach((menu) => {
      if (menu.page && menu.page.url) {
        urls.push(menu.page.url);
      }
      if (menu.menus) {
        // Si un menu a des sous-menus, on les parcourt aussi
        urls = urls.concat(this.extractUrls(menu.menus));
      }
    });

    return urls;
  }
}
