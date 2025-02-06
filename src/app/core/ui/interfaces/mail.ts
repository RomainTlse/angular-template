export interface Mail {
  id: string;
  expediteur: Expediteur;
  objet: string;
  content: string;
  dt_send: Date;
  timeDifference?: string;
  is_open: boolean;
}

export interface Expediteur {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  icon?: string;
}
