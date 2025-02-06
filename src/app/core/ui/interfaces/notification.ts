export interface Notification {
  id: number;
  title: string;
  description: string;
  dt_created: Date;
  timeDifference?: string;
  is_open: boolean;
  type: TypeNotification;
}

export interface TypeNotification {
  id: number;
  name: string;
  classCss: string;
  icon: string;
}
