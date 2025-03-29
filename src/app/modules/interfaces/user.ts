export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  profil: Profil;
}

export interface Profil {
  id: number;
  name: string;
}
