import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message, MessageType } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _messagesSubject = new Subject<Message | null>();
  public messages$ = this._messagesSubject.asObservable(); // Observable des messages

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
    this._messagesSubject.next(message); // Publier la message
    // Supprimer la message après la durée spécifiée
    setTimeout(() => this.clearMessage(), duration);
  }

  private clearMessage(): void {
    this._messagesSubject.next(null); // Effacer la message après la durée
  }
}
