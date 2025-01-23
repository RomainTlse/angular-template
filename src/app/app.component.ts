import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/ui/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './core/ui/components/message/message.component';
import { MessageService } from './core/ui/services/message.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslateModule,
    FormsModule,
    MessageComponent,
    MatSlideToggle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'angular-template';
  isDarkTheme = false;
  currentLang: string;

  constructor(
    public themeService: ThemeService,
    private _translate: TranslateService,
    private _messageService: MessageService
  ) {
    this.isDarkTheme = this.themeService.getThemeInLocalStorage() === 'dark';
    this.currentLang = 'fr'; // Langue actuelle
    this._translate.addLangs(['fr', 'en']);
    this._translate.setDefaultLang('fr');
    this._translate.use('fr');
  }

  // Fonction pour changer la langue
  switchLanguage(language: string): void {
    this._translate.use(language); // Utiliser la langue sélectionnée
    this.currentLang = language; // Mettre à jour la langue actuelle
  }

  showSuccess() {
    this._messageService.showMessage(
      'Opération réussie !',
      'success',
      "Vous pouvez continuer l'aventure",
      5000,
      true
    );
  }

  showError() {
    this._messageService.showMessage(
      'Une erreur est survenue.',
      'error',
      '',
      5000,
      true
    );
  }

  showInfo() {
    this._messageService.showMessage(
      'Voici une information importante.',
      'info',
      '',
      5000
    );
  }

  showWarning() {
    this._messageService.showMessage(
      'Attention, cette action est risquée.',
      'warning',
      '',
      5000
    );
  }
}
