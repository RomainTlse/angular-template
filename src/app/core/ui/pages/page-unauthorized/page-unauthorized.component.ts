import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-unauthorized',
  imports: [MatButton, TranslatePipe],
  templateUrl: './page-unauthorized.component.html',
  styleUrl: './page-unauthorized.component.sass',
})
export class PageUnauthorizedComponent {}
