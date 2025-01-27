import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-page-unauthorized',
  imports: [TranslatePipe, Button],
  templateUrl: './page-unauthorized.component.html',
  styleUrl: './page-unauthorized.component.sass',
})
export class PageUnauthorizedComponent {}
