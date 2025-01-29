export interface Menu {
  id: number;
  name?: string;
  icon?: string;
  categories?: Menu[];
  menus?: Menu[];
  page?: Page;
}

export interface Page {
  id: number;
  name: string;
  url: string;
}
