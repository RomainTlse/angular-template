import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-page-not-found',
  imports: [TranslatePipe, Button],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.sass',
})
export class PageNotFoundComponent {}
