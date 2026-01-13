export interface RegisterDto {
    firma1: string;
    firma2: string;
    strasse: string;
    plz: string;
    stadt: string;
    staat: string;
    anrede: string;
    vorname: string;
    nachname: string;
    geburtstag: Date;
    email: string;
    password: string;
    pylon: string;
}

export interface RegisterRspDto {
    isSuccessfulRegistration: boolean;
    errros: string[];
}
