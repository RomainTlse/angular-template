import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ThemeService } from './core/ui/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'angular-template';
  isDarkTheme = false;

  constructor(public themeService: ThemeService) {
    this.isDarkTheme = this.themeService.getThemeInLocalStorage() === 'dark';
  }
}
