import { Component, inject, ViewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NotificationComponent } from '../popovers/notification/notification.component';
import { Popover } from 'primeng/popover';
import { ShortcutComponent } from '../popovers/shortcut/shortcut.component';
import { UserComponent } from '../popovers/user/user.component';
import { SearchComponent } from '../modals/search/search.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThemeService } from '../../services/theme.service';
import { Icon } from '../../../../app.component';
import {
  Language,
  LanguageService,
} from '../../../utils/services/language.service';
import { Badge } from 'primeng/badge';
import { MailComponent } from '../popovers/mail/mail.component';
import { hugeMail02 } from '@ng-icons/huge-icons';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    NgIcon,
    NotificationComponent,
    Popover,
    ShortcutComponent,
    UserComponent,
    Badge,
    MailComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
  viewProviders: [
    provideIcons({
      hugeMail02,
    }),
  ],
})
export class HeaderComponent {
  @ViewChild('popoverShortcut') popoverShortcut!: Popover;
  @ViewChild('popoverMessage') popoverMessage!: Popover;
  @ViewChild('popoverNotification') popoverNotification!: Popover;
  @ViewChild('popoverUser') popoverUser!: Popover;

  ref?: DynamicDialogRef;

  public themeService = inject(ThemeService);
  icon: Icon = 'hugeSun02';
  selectedLang: Language = 'fr';
  languageLogo = 'images/france.png';
  notificationCount = 0;
  mailCount = 0;
  protected dialogService = inject(DialogService);
  protected languageService = inject(LanguageService);

  constructor(
    private store: Store,
    private translate: TranslateService
  ) {
    this.themeService.getTheme().subscribe((isDark) => {
      this.icon = isDark ? 'hugeSun02' : 'hugeMoon02'; // Change l'icône selon le thème
    });

    this.languageService.getLanguage().subscribe((lang) => {
      this.selectedLang = lang;
      this.languageLogo =
        lang === 'fr' ? 'images/royaume-uni.png' : 'images/france.png';
    });

    this.store
      .select((state) => state.notifications.notificationCount)
      .subscribe((count) => (this.notificationCount = count ?? 0));

    this.store
      .select((state) => state.mails.mailCount)
      .subscribe((count) => {
        console.log(count);
        return (this.mailCount = count ?? 0);
      });
  }

  openDialogSearch(): void {
    this.translate
      .get('header.search')
      .subscribe((translatedHeader: string) => {
        this.ref = this.dialogService.open(SearchComponent, {
          header: translatedHeader,
          modal: true,
          width: '500px',
          closable: true,
          dismissableMask: true,
        });

        this.ref.onClose.subscribe(() => {
          console.log('--modale search close');
        });
      });
  }

  toggleShortcut(event: MouseEvent) {
    this.popoverShortcut.toggle(event);
  }

  toggleMessage(event: MouseEvent) {
    this.popoverMessage.toggle(event);
  }

  toggleNotification(event: MouseEvent) {
    this.popoverNotification.toggle(event);
  }

  toggleUser(event: MouseEvent) {
    this.popoverUser.toggle(event);
  }
}
