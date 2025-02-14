export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface Message {
  title: string;
  type: MessageType;
  subtitle?: string;
  duration?: number; // Durée de l'affichage du mail, en millisecondes
  undoable?: boolean; // Si un bouton Undo doit être affiché
  startTime?: number; // Initialisation du startTime
  progress?: number;
}
