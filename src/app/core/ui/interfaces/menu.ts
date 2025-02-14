import { Page } from './page';

export interface Menu {
  id: number;
  name?: string;
  icon?: string;
  categories?: Menu[];
  menus?: Menu[];
  page?: Page;
}
