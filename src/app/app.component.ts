import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ThemeService } from './core/ui/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggle, TranslateModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'angular-template';
  isDarkTheme = false;
  currentLang: string;

  constructor(
    public themeService: ThemeService,
    private translate: TranslateService
  ) {
    this.isDarkTheme = this.themeService.getThemeInLocalStorage() === 'dark';
    this.currentLang = 'fr'; // Langue actuelle
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }

  // Fonction pour changer la langue
  switchLanguage(language: string): void {
    this.translate.use(language); // Utiliser la langue sélectionnée
    this.currentLang = language; // Mettre à jour la langue actuelle
  }
}
