import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: Theme = 'light'; // Default theme
  constructor() {
    this.loadTheme();
  }

  toogleTheme() {
    if (this.currentTheme === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  // Function to apply a theme
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }

    // Saving the theme to localStorage
    this.setThemeInLocalStorage(theme);
  }

  setThemeInLocalStorage(theme: Theme): void {
    localStorage.setItem('theme', theme);
  }

  getThemeInLocalStorage(): Theme {
    return (localStorage.getItem('theme') as Theme) ?? 'light';
  }

  // Load saved theme from localStorage
  loadTheme(): void {
    this.setTheme(this.getThemeInLocalStorage());
  }
}
