import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './core/ui/components/message/message.component';
import { MessageService } from './core/ui/services/message.service';
import { LoaderComponent } from './core/ui/components/loader/loader.component';
import { LoaderService } from './core/ui/services/loader.service';
import { provideIcons } from '@ng-icons/core';
import {
  hugeGridView,
  hugeMoon02,
  hugeNotification03,
  hugeSearch02,
  hugeSun02,
} from '@ng-icons/huge-icons';
import { RouterOutlet } from '@angular/router';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuComponent } from './core/ui/components/menu/menu.component';
import { HeaderComponent } from './core/ui/components/header/header.component';

export type Icon = 'hugeMoon02' | 'hugeSun02';

@Component({
  selector: 'app-root',
  imports: [
    TranslateModule,
    FormsModule,
    MessageComponent,
    LoaderComponent,
    DynamicDialogModule,
    RouterOutlet,
    MenuComponent,
    HeaderComponent,
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
  title = 'angular-template';

  constructor(
    private _messageService: MessageService,
    private _loaderService: LoaderService
  ) {
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
