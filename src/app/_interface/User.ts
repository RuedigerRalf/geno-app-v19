export interface User {
  id: string;
  username: string;
  email: string;
  isadmin: boolean;
}

export interface LogedUser {
  firma1: string;
  firma2: string;
  anrede: string;
  vorname: string;
  nachname: string;
  fullName: string;
  email: string;
  rollen: string[];
  token: string;
  refreshToken: string;

  status: number;
  statusText: string;
  kundennummer: number;
  
  hatadresse: boolean;
  val4: boolean;
  val6: string;
}

export interface UserForEdit {
  firma1: string;
  firma2: string;
  anrede: string;
  vorname: string;
  nachname: string;
  geburtstag: Date;
  strasse: string;
  plz: string;
  stadt: string;
  staat: string;
  registeredOn: Date;
  email: string;
}

export interface UserForEditResp {
  firma1: string;
  firma2: string;
  // anrede: string;
  // firstName: string;
  // lastName: string;
  // birthday: Date;
  strasse: string;
  plz: string;
  stadt: string;
  staat: string;
  // registeredOn: Date;
  // email: string;
}
