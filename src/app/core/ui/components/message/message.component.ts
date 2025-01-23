import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessageService } from '../../services/message.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-message',
  imports: [NgClass, NgForOf, NgIf, MatProgressBar, MatIcon],
  templateUrl: './message.component.html',
  styleUrl: './message.component.sass',
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  @HostBinding('class.dark-mode') isDarkMode = false;
  protected readonly Date = Date;
  private messageSubscription?: Subscription;

  constructor(private _messageService: MessageService) {}

  ngOnInit(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark-mode');
    console.log(this.isDarkMode);
    this.messageSubscription = this._messageService.messages$.subscribe(
      (message) => {
        if (message) {
          this.messages.push(message); // Ajouter la message à la liste
          if (message.duration) {
            // Initialisation du timer pour mettre à jour la barre de progression
            const startTime = Date.now();
            message.progress = 0; // Définir la valeur de progression initiale à 0

            // Mettre à jour la progression toutes les 100ms
            const progressInterval = setInterval(() => {
              const elapsedTime = Date.now() - startTime;
              message.progress = (elapsedTime / message.duration!) * 100;

              // Si la durée de la message est dépassée, on arrête le timer
              if (elapsedTime >= message.duration!) {
                clearInterval(progressInterval);
              }
            }, 100);
          }
          // setTimeout(() => {
          //   this.messages.shift(); // Retirer la message après la durée
          // }, message.duration);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe(); // Désabonnement pour éviter les fuites de mémoire
    }
  }

  // Calculer la largeur de la barre de progression
  getProgressBarWidth(message: Message): number {
    if (message && message.startTime && message.duration) {
      const timeElapsed = Date.now() - message.startTime;
      const progress = (timeElapsed / message.duration) * 100;
      return Math.min(progress, 100); // S'assurer que la largeur ne dépasse pas 100%
    }
    return 0; // Si aucune donnée n'est disponible, la barre reste vide
  }

  onKeydown(event: KeyboardEvent, action: string, index: number): void {
    // Vérifiez si la touche est "Entrée" ou "Espace"
    if (event.key === 'u' && action === 'undo') {
      this.undoMessage(index); // Appel de la même méthode de clic
    }

    if (event.key === 'c' && action === 'close') {
      this.closeMessage(index); // Appel de la même méthode de clic
    }
  }

  // Fonction pour fermer une message manuellement
  closeMessage(index: number): void {
    this.messages.splice(index, 1);
  }

  // Fonction pour annuler l'action (undo)
  undoMessage(index: number): void {
    const message = this.messages[index];
    console.log('Undo:', message.title);
    this.messages.splice(index, 1); // Supprimer la message
  }
}
