import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { NgScrollbar } from 'ngx-scrollbar';
import { Divider } from 'primeng/divider';
import { Mail } from '../../../interfaces/mail';
import { DatetimeService } from '../../../../utils/services/datetime.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message',
  imports: [Button, NgScrollbar, Divider],
  templateUrl: './message.component.html',
  styleUrl: './message.component.sass',
})
export class MessageComponent implements OnInit {
  mails?: Mail[];
  private _datetimeService = inject(DatetimeService);
  private _http = inject(HttpClient);

  ngOnInit() {
    this._http.get<Mail[]>('documents/mails.json').subscribe((mails) => {
      this.mails = mails;
      this.mails.forEach((mail) => {
        mail.timeDifference = this._datetimeService.getDateTimeDifference(
          mail.dt_send
        );
      });
    });
  }

  getInitials(name: string) {
    // Sépare le nom par des espaces
    const words = name.split(' ');

    // Prend la première lettre de chaque mot et les met en majuscule
    return words.map((word) => word.charAt(0).toUpperCase()).join('');
  }
}
