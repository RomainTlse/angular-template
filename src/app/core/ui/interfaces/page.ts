import { Menu } from './menu';

export interface Page {
  id: number;
  name: string;
  url: string;
  category?: Menu;
}
