import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { Loader } from '../../interfaces/loader';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.sass',
  encapsulation: ViewEncapsulation.None,
})
export class LoaderComponent {
  show = false;
  @ViewChild('matrix', { static: false }) matrixElement?: ElementRef;
  private _subscription: Subscription;

  constructor(private _loaderService: LoaderService) {
    this._subscription = this._loaderService.loaderState.subscribe(
      (state: Loader) => {
        this.show = state.show;
      }
    );
  }

  ngOnInit() {
    this.updateStatus();
  }

  ngAfterViewInit() {
    // Create matrix rain effect
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

    for (let i = 0; i < 50; i++) {
      const column = document.createElement('div');
      // column.className = 'matrix-column';
      column.classList.add('matrix-column'); // Si tu veux ajouter une classe CSS
      column.style.left = `${i * 20}px`;
      column.style.animationDuration = `${Math.random() * 2 + 1}s`;

      let content = '';
      for (let j = 0; j < 50; j++) {
        content +=
          characters[Math.floor(Math.random() * characters.length)] + '<br>';
      }
      column.innerHTML = content;
      this.matrixElement?.nativeElement.appendChild(column);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  // Dynamically update status texts
  updateStatus() {
    const dots = ['', '.', '..', '...'];
    let dotIndex = 0;

    setInterval(() => {
      const progressText = document.querySelector('.progress-text');
      if (progressText)
        progressText.textContent = `Bienvenue dans la Matrice ! Chargement${dots[dotIndex]}`;
      dotIndex = (dotIndex + 1) % dots.length;
    }, 500);
  }
}
