export interface LoginDto {
    email: string;
    password: string;
    pylon: string;
}

export interface LoginRespDto {
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
    laufzeitVon: Date;
    laufzeitBis: Date;
    registriert: Date;
    abo: number;
    erinnerungen: number;
    bilder: number;
    error: string;
    hatadresse: boolean;
    val4: boolean;
    val6: string;
}