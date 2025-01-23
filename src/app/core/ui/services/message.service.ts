import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface Message {
  title: string;
  type: MessageType;
  subtitle?: string;
  duration?: number; // Durée de l'affichage du message, en millisecondes
  undoable?: boolean; // Si un bouton Undo doit être affiché
  startTime?: number; // Initialisation du startTime
  progress?: number;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messagesSubject = new Subject<Message | null>();
  public messages$ = this.messagesSubject.asObservable(); // Observable des messages

  showMessage(
    title: string,
    type: MessageType,
    subtitle = '',
    duration = 3000,
    undoable = false
  ): void {
    const message: Message = {
      title,
      type,
      subtitle,
      duration,
      undoable,
      startTime: Date.now(),
    };
    this.messagesSubject.next(message); // Publier la message
    // Supprimer la message après la durée spécifiée
    setTimeout(() => this.clearMessage(), duration);
  }

  private clearMessage(): void {
    this.messagesSubject.next(null); // Effacer la message après la durée
  }
}
