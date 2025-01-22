import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-page-not-found',
  imports: [TranslatePipe, MatButton],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.sass',
})
export class PageNotFoundComponent {}
