import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message';
import { NgClass } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';
import { $dt } from '@primeng/themes';

@Component({
  selector: 'app-message',
  imports: [NgClass, ProgressBar],
  templateUrl: './message.component.html',
  styleUrl: './message.component.sass',
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  protected readonly Date = Date;
  private messageSubscription?: Subscription;

  private _messageService = inject(MessageService);

  ngOnInit(): void {
    this.messageSubscription = this._messageService.messages$.subscribe(
      (message) => {
        if (message) {
          console.log('message', message);
          this.messages.push(message); // Ajouter la message à la liste
          setTimeout(() => {
            this.messages.shift(); // Retirer la message après la durée
          }, message.duration! + 1100);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe(); // Désabonnement pour éviter les fuites de mémoire
    }
  }

  colorProgressBar(message: Message) {
    switch (message.type) {
      case 'success':
        return $dt('emerald.900').value;

      case 'error':
        return $dt('red.800').value;

      case 'info':
        return $dt('cyan.900').value;

      case 'warning':
        return $dt('orange.900').value;

      default:
        return $dt('emerald.900').value;
    }
  }

  // Calculer la largeur de la barre de progression
  getProgressBarWidth(message: Message): number {
    if (message.duration) {
      const timeElapsed = Date.now() - message.startTime!;
      return (timeElapsed / message.duration!) * 100;
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
