import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from './core/ui/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './core/ui/components/message/message.component';
import { MessageService } from './core/ui/services/message.service';
import { LoaderComponent } from './core/ui/components/loader/loader.component';
import { LoaderService } from './core/ui/services/loader.service';
import {
  Language,
  LanguageService,
} from './core/utils/services/language.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  hugeGridView,
  hugeMoon02,
  hugeNotification03,
  hugeSearch02,
  hugeSun02,
} from '@ng-icons/huge-icons';
import { RouterOutlet } from '@angular/router';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SearchComponent } from './core/ui/components/modals/search/search.component';
import { Popover } from 'primeng/popover';
import { ShortcutComponent } from './core/ui/components/popovers/shortcut/shortcut.component';
import { NotificationComponent } from './core/ui/components/popovers/notification/notification.component';
import { UserComponent } from './core/ui/components/popovers/user/user.component';
import { MenuComponent } from './core/ui/components/menu/menu.component';

export type Icon = 'hugeMoon02' | 'hugeSun02';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    FormsModule,
    MessageComponent,
    LoaderComponent,
    NgIcon,
    DynamicDialogModule,
    RouterOutlet,
    ShortcutComponent,
    Popover,
    NotificationComponent,
    UserComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  viewProviders: [
    provideIcons({
      hugeSearch02,
      hugeGridView,
      hugeMoon02,
      hugeSun02,
      hugeNotification03,
    }),
  ],
  providers: [DialogService],
})
export class AppComponent implements OnInit {
  @ViewChild('popoverShortcut') popoverShortcut!: Popover;
  @ViewChild('popoverNotification') popoverNotification!: Popover;
  @ViewChild('popoverUser') popoverUser!: Popover;

  title = 'angular-template';
  icon: Icon = 'hugeSun02';

  selectedLang: Language = 'fr'; // Langue par défaut
  languageLogo = 'images/france.png'; // Logo par défaut
  ref?: DynamicDialogRef;

  private _dialogService = inject(DialogService);

  constructor(
    public themeService: ThemeService,
    protected languageService: LanguageService,
    private _translate: TranslateService,
    private _messageService: MessageService,
    private _loaderService: LoaderService
  ) {
    this.themeService.getTheme().subscribe((isDark) => {
      this.icon = isDark ? 'hugeSun02' : 'hugeMoon02'; // Change l'icône selon le thème
    });
    this.languageService.getLanguage().subscribe((lang) => {
      this.selectedLang = lang;
      this.languageLogo =
        lang === 'fr' ? 'images/royaume-uni.png' : 'images/france.png';
    });

    // this._router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationStart) {
    //
    //   } else if (event instanceof NavigationEnd) {
    //
    //   }
    // });
  }

  ngOnInit() {
    this._loaderService.show();
    setTimeout(() => {
      this._loaderService.hide();
    }, 1000);
  }

  openDialogSearch(): void {
    this.ref = this._dialogService.open(SearchComponent, {
      header: 'Select a Product',
      modal: true,
    });
  }

  toggleShortcut(event: MouseEvent) {
    this.popoverShortcut.toggle(event);
  }

  toggleNotification(event: MouseEvent) {
    this.popoverNotification.toggle(event);
  }

  toggleUser(event: MouseEvent) {
    this.popoverUser.toggle(event);
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
