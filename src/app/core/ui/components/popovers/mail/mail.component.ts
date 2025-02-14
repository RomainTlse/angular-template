import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { NgScrollbar } from 'ngx-scrollbar';
import { Divider } from 'primeng/divider';
import { Mail } from '../../../interfaces/mail';
import { DatetimeService } from '../../../../utils/services/datetime.service';
import { Observable } from 'rxjs';
import { LoadMails } from '../../../stores/mail/mail.actions';
import { MailState } from '../../../stores/mail/mail.state';
import { Store } from '@ngxs/store';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-mail',
  imports: [Button, NgScrollbar, Divider, AsyncPipe, TranslatePipe],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.sass',
})
export class MailComponent {
  mails$: Observable<Mail[]>;
  mailCount = 0;

  protected datetimeService = inject(DatetimeService);

  constructor(private store: Store) {
    this.store.dispatch(new LoadMails());
    this.mails$ = this.store.select(MailState.getAllMails);
    this.store
      .select((state) => state.mails.mailCount)
      .subscribe((count) => (this.mailCount = count ?? 0));
  }

  getInitials(name: string) {
    // Sépare le nom par des espaces
    const words = name.split(' ');

    // Prend la première lettre de chaque mot et les met en majuscule
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  }
}
