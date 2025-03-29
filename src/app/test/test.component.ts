import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { UserService } from '../modules/services/user.service';

@Component({
  selector: 'app-test',
  imports: [ButtonModule, Card],
  templateUrl: './test.component.html',
  styleUrl: './test.component.sass',
})
export class TestComponent {
  private _userService = inject(UserService);

  ngOnInit() {
    this._userService.getUsers().subscribe();
  }
}
