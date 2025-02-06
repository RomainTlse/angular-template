import { Component } from '@angular/core';
import { Badge } from 'primeng/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  hugeLogout03,
  hugeMail02,
  hugeSetting07,
  hugeUser,
} from '@ng-icons/huge-icons';

@Component({
  selector: 'app-user',
  imports: [Badge, NgIcon],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
  viewProviders: [
    provideIcons({
      hugeUser,
      hugeSetting07,
      hugeMail02,
      hugeLogout03,
    }),
  ],
})
export class UserComponent {}
