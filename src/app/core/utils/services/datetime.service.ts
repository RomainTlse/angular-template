import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatetimeService {
  public getDateTimeDifference(date: Date): string {
    const now = new Date();
    const dt = new Date(date);

    const diffInMs = now.getTime() - dt.getTime();

    // Calcule la différence en secondes, minutes, heures, jours, semaines
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Renvoie la différence sous un format adapté
    if (weeks > 0) {
      return `${weeks} semaine${weeks > 1 ? 's' : ''}`;
    } else if (days > 0) {
      return `${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return `${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
  }
}
