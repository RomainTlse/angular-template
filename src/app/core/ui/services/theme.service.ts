import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _currentTheme: Theme = 'light'; // Default theme
  private _isDarkTheme = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  loadTheme(): void {
    this.setTheme(this.getThemeInLocalStorage());
  }

  toogleTheme() {
    if (this._currentTheme === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  setTheme(theme: Theme): void {
    this._currentTheme = theme;
    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      this._isDarkTheme.next(true);
      htmlElement.classList.add('dark-mode');
    } else {
      this._isDarkTheme.next(false);
      htmlElement.classList.remove('dark-mode');
    }

    this.setThemeInLocalStorage(theme);
  }

  getTheme(): BehaviorSubject<boolean> {
    return this._isDarkTheme;
  }

  setThemeInLocalStorage(theme: Theme): void {
    localStorage.setItem('theme', theme);
  }

  getThemeInLocalStorage(): Theme {
    return (localStorage.getItem('theme') as Theme) ?? 'light';
  }
}
