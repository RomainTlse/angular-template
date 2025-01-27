import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'fr' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _currentLang = new BehaviorSubject<Language>('en');
  currentLang$ = this._currentLang.asObservable();

  constructor(private _translate: TranslateService) {
    this._translate.addLangs(['fr', 'en']);
    this._translate.setDefaultLang('fr');
    this.loadLanguage();
  }

  loadLanguage(): void {
    this.setLanguage(this.getLanguageInLocalStorage());
  }

  changeLanguage(lang: Language): void {
    console.log(lang);
    this.setLanguage(lang);
    this.setLanguageInLocalStorage(lang);
  }

  setLanguage(lang: Language): void {
    console.log(
      'setLanguage',
      lang,
      this._translate.currentLang,
      this._translate.defaultLang
    );
    this._currentLang.next(lang);
    this._translate.use(lang);
  }

  getLanguage(): BehaviorSubject<Language> {
    return this._currentLang;
  }

  setLanguageInLocalStorage(lang: Language): void {
    localStorage.setItem('lang', lang);
  }

  getLanguageInLocalStorage(): Language {
    return (localStorage.getItem('lang') as Language) ?? 'fr';
  }
}
