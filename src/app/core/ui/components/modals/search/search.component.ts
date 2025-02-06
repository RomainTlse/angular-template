import { Component, inject, OnInit } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Menu } from '../../../interfaces/menu';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeAdd02, hugeLink01 } from '@ng-icons/huge-icons';

@Component({
  selector: 'app-search',
  imports: [FloatLabel, InputText, ReactiveFormsModule, NgIcon],
  templateUrl: './search.component.html',
  styleUrl: './search.component.sass',
  viewProviders: [
    provideIcons({
      hugeAdd02,
      hugeLink01,
    }),
  ],
})
export class SearchComponent implements OnInit {
  menus?: Menu[];
  categoryUrlsName?: {
    categoryName: string;
    menus: { menuName: string; url: string }[];
  }[] = [];
  filteredCcategoryUrlsName?: {
    categoryName: string;
    menus: { menuName: string; url: string }[];
  }[] = [];
  searchForm: FormGroup;

  private _http = inject(HttpClient);

  constructor() {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
    });

    this.searchForm.get('searchQuery')?.valueChanges.subscribe((query) => {
      if (this.categoryUrlsName) {
        this.filteredCcategoryUrlsName = this.filterMenu(
          this.categoryUrlsName,
          query
        );
      }
    });
  }

  ngOnInit() {
    this._http.get<Menu[]>('documents/menus.json').subscribe((menus) => {
      this.menus = menus;
      this.filteredCcategoryUrlsName = this.categoryUrlsName =
        this.getCategoriesGroupedByName();
    });
  }

  getCategoriesGroupedByName(): {
    categoryName: string;
    menus: { menuName: string; url: string }[];
  }[] {
    const result: {
      categoryName: string;
      menus: { menuName: string; url: string }[];
    }[] = [];

    // Parcours des dashboards pour chercher les catégories
    this.menus?.forEach((menu) => {
      // Si le menu a des menus, on les ajoute à la catégorie principale
      if (menu.menus && menu.name) {
        result.push({
          categoryName: menu.name,
          menus: this.extractNamesAndUrls(menu.menus), // Extraire les menus et leurs URLs
        });
      }

      // Si le menu a des sous-catégories (categories), on les parcourt
      if (menu.categories) {
        let menus: { menuName: string; url: string }[] = [];
        menu.categories.forEach((category) => {
          menus = menus.concat(this.extractNamesAndUrls(category.menus || []));
        });
        // Ajouter les sous-menus dans la catégorie principale
        if (menu.name) {
          result.push({
            categoryName: menu.name,
            menus,
          });
        }
      }
    });

    return result;
  }

  filterMenu(
    data: {
      categoryName: string;
      menus: { menuName: string; url: string }[];
    }[],
    query: string
  ) {
    return data
      .map((category) => {
        const filteredMenus = category.menus.filter(
          (menu) =>
            menu.menuName.toLowerCase().includes(query.toLowerCase()) ||
            menu.url.toLowerCase().includes(query.toLowerCase())
        );
        return { ...category, menus: filteredMenus };
      })
      .filter((category) => category.menus.length > 0); // Supprimer les catégories vides
  }

  private extractNamesAndUrls(
    menus: Menu[]
  ): { menuName: string; url: string }[] {
    let result: { menuName: string; url: string }[] = [];

    menus.forEach((menu) => {
      if (menu.page && menu.page.url) {
        // Ajoute le nom et l'URL du menu
        result.push({
          menuName: menu.page.name || 'Unnamed Menu', // Utilise un nom par défaut si le nom du menu est absent
          url: menu.page.url,
        });
      }

      // Si un menu a des sous-menus, on les parcourt aussi
      if (menu.menus) {
        result = result.concat(this.extractNamesAndUrls(menu.menus));
      }
    });

    return result;
  }
}
