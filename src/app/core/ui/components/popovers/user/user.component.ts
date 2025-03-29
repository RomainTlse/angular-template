import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  hugeLogout03,
  hugeMail02,
  hugeSetting07,
  hugeUser,
} from '@ng-icons/huge-icons';
import { AuthService } from '../../../../utils/services/auth.service';
import { User } from '../../../../../modules/interfaces/user';

@Component({
  selector: 'app-user',
  imports: [NgIcon],
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
export class UserComponent {
  user: User | null;
  private _authService = inject(AuthService);

  constructor() {
    this.user = this._authService.currentUser;
  }

  logout(): void {
    this._authService.logout();
  }
}
