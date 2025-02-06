import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { hugeAdd02 } from '@ng-icons/huge-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-shortcut',
  imports: [NgIcon, NgScrollbarModule],
  templateUrl: './shortcut.component.html',
  styleUrl: './shortcut.component.sass',
  viewProviders: [
    provideIcons({
      hugeAdd02,
    }),
  ],
})
export class ShortcutComponent {}
