/**
 * Standardisierte API Error Response Struktur
 * Die API gibt nur den Error Code zurück
 */
export interface ApiErrorResponse {
  code: number;
}

/**
 * Reduzierte & sicherheitsoptimierte Fehlercodes
 */
export enum ApiErrorCode {
  // Client-Fehler (400er Bereich)
  VALIDATION_ERROR = 100,      // Datenformat falsch, Pflichtfelder fehlen
  INVALID_CREDENTIALS = 101,   // Login fehlgeschlagen (E-Mail ODER Passwort falsch)
  ACTION_EXPIRED = 102,        // Token abgelaufen (Password Reset, E-Mail Bestätigung)
  ACTION_FORBIDDEN = 103,      // Keine Berechtigung oder Account gesperrt
  CONFLICT = 104,              // Ressource existiert bereits (E-Mail schon registriert)
  
  // Account Status (UX-relevante Einschränkungen)
  ACCOUNT_NOT_CONFIRMED = 200, // E-Mail noch nicht bestätigt
  EMAIL_ALREADY_CONFIRMED = 201, // E-Mail bereits bestätigt

  // System-Fehler (500er Bereich)
  SERVER_ERROR = 500,          // Alles Interne (DB-Fehler, Mail-Dienst, Encryption)
  RATE_LIMIT_EXCEEDED = 501    // Zu viele Anfragen (Brute-Force Schutz)
}

export const ERROR_MESSAGES: Record<number, string> = {
  [ApiErrorCode.VALIDATION_ERROR]: 'Bitte überprüfen Sie Ihre Eingaben auf Vollständigkeit und Format.',
  
  [ApiErrorCode.INVALID_CREDENTIALS]: 'Anmeldung fehlgeschlagen.\nE-Mail-Adresse oder Passwort ist nicht korrekt.',
  
  [ApiErrorCode.ACTION_EXPIRED]: 'Dieser Link ist nicht mehr gültig.\nBitte fordern Sie einen neuen an.',
  
  [ApiErrorCode.ACTION_FORBIDDEN]: 'Dieser Vorgang ist nicht erlaubt oder Ihr Konto wurde deaktiviert.',
  
  [ApiErrorCode.CONFLICT]: 'Ein Konto mit dieser E-Mail-Adresse existiert bereits.',

  [ApiErrorCode.ACCOUNT_NOT_CONFIRMED]: 'Ihr Konto ist noch nicht aktiviert.\nBitte bestätigen Sie Ihre E-Mail-Adresse.',

  [ApiErrorCode.SERVER_ERROR]: 'Ein technischer Fehler ist aufgetreten.\nBitte versuchen Sie es später erneut.',
  
  [ApiErrorCode.RATE_LIMIT_EXCEEDED]: 'Zu viele Versuche.\nBitte warten Sie einen Moment, bevor Sie es erneut versuchen.'
};

export function getErrorMessage(error: any): string {
  // 1. Extraktion des Codes (unverändert)
  const rawCode = error?.error?.code ?? error?.code ?? error?.error?.errorCode;
  
  if (rawCode !== undefined && rawCode !== null) {
    const code = Number(rawCode);
    if (ERROR_MESSAGES[code]) {
      return ERROR_MESSAGES[code];
    }
  }

  // 2. Fallback auf HTTP Status Codes (Sicherheitsnetz)
  const status = error?.status;
  
  if (status === 0) return 'Server nicht erreichbar.\nBitte Internetverbindung prüfen.';
  if (status === 401) return ERROR_MESSAGES[ApiErrorCode.INVALID_CREDENTIALS];
  if (status === 403) return ERROR_MESSAGES[ApiErrorCode.ACTION_FORBIDDEN];
  if (status === 429) return ERROR_MESSAGES[ApiErrorCode.RATE_LIMIT_EXCEEDED];
  if (status >= 500) return ERROR_MESSAGES[ApiErrorCode.SERVER_ERROR];

  return 'Ein unerwarteter Fehler ist aufgetreten.';
}
