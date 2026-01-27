/**
 * Standardisierte API Error Response Struktur
 * Die API gibt nur den Error Code zurück
 */
export interface ApiErrorResponse {
  code: number;
}

/**
 * Error Codes Enum für bessere Typsicherheit
 */
export enum ApiErrorCode {
  // Registrierung & E-Mail Bestätigung (10-19)
  EMAIL_ALREADY_CONFIRMED = 10,
  INVALID_DATA = 11,
  TOKEN_EXPIRED = 12,
  USER_NOT_FOUND = 13,
  EMAIL_ALREADY_EXISTS = 14,

  // Login & Authentifizierung (20-29)
  INVALID_CREDENTIALS = 20,
  ACCOUNT_NOT_CONFIRMED = 21,
  ACCOUNT_LOCKED = 22,
  ACCOUNT_DEACTIVATED = 23,

  // Password Reset (30-39)
  INVALID_RESET_TOKEN = 30,
  PASSWORD_TOO_WEAK = 31,
  PASSWORD_RECENTLY_USED = 32,

  // E-Mail Änderung (40-49)
  EMAIL_CHANGE_ALREADY_PENDING = 40,
  NEW_EMAIL_ALREADY_IN_USE = 41,

  // Membership (50-59)
  MEMBERSHIP_ALREADY_TERMINATED = 50,
  ACTIVE_SUBSCRIPTION = 51,

  // Verschlüsselung/Entschlüsselung (60-69)
  ENCRYPTION_ERROR = 60,
  PYLON_INVALID = 61,
  DECRYPTION_FAILED = 62,

  // Mail-Service Fehler (70-79)
  MAIL_SEND_FAILED = 70,
  MAIL_TEMPLATE_ERROR = 71,

  // Datenbankoperationen (80-89)
  DATABASE_ERROR = 80,
  UPDATE_FAILED = 81,
  SAVE_FAILED = 82,

  // Autorisierung & Berechtigung (90-99)
  UNAUTHORIZED_ACCESS = 90,
  INSUFFICIENT_PERMISSIONS = 91,

  // Allgemeine Fehler (100+)
  VALIDATION_ERROR = 100,
  VALIDATION_MODEL_ERROR = 101,
  VALIDATION_PYLON_ERROR = 102,

  // Bestellungs/Payment spezifisch (110-119)
  PAYMENT_REQUIRED = 110,
  SUBSCRIPTION_EXPIRED = 111,
  INVOICE_ERROR = 112,

  // Rate Limiting & Sicherheit (120-129)
  RATE_LIMIT_EXCEEDED = 120,
  SUSPICIOUS_ACTIVITY = 121,
  IP_BLOCKED = 122,

  // System Fehler (500+)
  SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

/**
 * User-freundliche Fehlermeldungen mapping
 */
export const ERROR_MESSAGES: Record<number, string> = {

  // Registrierung & E-Mail Bestätigung (10-19)
  [ApiErrorCode.EMAIL_ALREADY_CONFIRMED]: 'E-Mail wurde bereits bestätigt.\nSie können sich direkt anmelden.',
  [ApiErrorCode.INVALID_DATA]: 'Ihre Eingabedaten sind ungültig.\nBitte überprüfen Sie Ihre Eingaben und versuchen es erneut.',
  [ApiErrorCode.TOKEN_EXPIRED]: 'Der Bestätigungslink ist abgelaufen.\nBitte fordern Sie einen neuen an.',
  [ApiErrorCode.USER_NOT_FOUND]: 'Benutzer nicht gefunden.\nBitte registrieren Sie sich erneut.',
  [ApiErrorCode.EMAIL_ALREADY_EXISTS]: 'Diese E-Mail-Adresse wird bereits verwendet.\nBitte verwenden Sie eine andere.',

  // Login & Authentifizierung (20-29)
  [ApiErrorCode.INVALID_CREDENTIALS]: 'Ungültige Anmeldedaten.\nBitte überprüfen Sie E-Mail und Passwort.',
  [ApiErrorCode.ACCOUNT_NOT_CONFIRMED]: 'Ihr Konto wurde noch nicht bestätigt.\nBitte prüfen Sie Ihr Postfach.',
  [ApiErrorCode.ACCOUNT_LOCKED]: 'Ihr Konto wurde gesperrt.\nBitte kontaktieren Sie den Support.',
  [ApiErrorCode.ACCOUNT_DEACTIVATED]: 'Ihr Konto wurde deaktiviert.\nBitte kontaktieren Sie den Support.',

  // Password Reset (30-39)
  [ApiErrorCode.INVALID_RESET_TOKEN]: 'Ungültiger Link zum Zurücksetzen.\nBitte fordern Sie einen neuen an.',
  [ApiErrorCode.PASSWORD_TOO_WEAK]: 'Das Passwort ist nicht sicher genug.\nVerwenden Sie Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen.',
  [ApiErrorCode.PASSWORD_RECENTLY_USED]: 'Dieses Passwort wurde kürzlich verwendet.\nBitte wählen Sie ein anderes.',

  // E-Mail Änderung (40-49)
  [ApiErrorCode.EMAIL_CHANGE_ALREADY_PENDING]: 'Es läuft bereits eine E-Mail-Änderung.\nBitte prüfen Sie Ihr Postfach.',
  [ApiErrorCode.NEW_EMAIL_ALREADY_IN_USE]: 'Die neue E-Mail-Adresse wird bereits verwendet.\nBitte wählen Sie eine andere.',

  // Membership (50-59)
  [ApiErrorCode.MEMBERSHIP_ALREADY_TERMINATED]: 'Die Mitgliedschaft wurde bereits gekündigt.',
  [ApiErrorCode.ACTIVE_SUBSCRIPTION]: 'Sie haben noch ein aktives Abonnement.\nBitte kündigen Sie dieses zuerst.',

  // Verschlüsselung/Entschlüsselung (60-69)
  [ApiErrorCode.ENCRYPTION_ERROR]: 'Verschlüsselungsfehler.\nBitte versuchen Sie es erneut.',
  [ApiErrorCode.PYLON_INVALID]: 'Ungültige Sicherheitskennung.\nBitte laden Sie die Seite neu.',
  [ApiErrorCode.DECRYPTION_FAILED]: 'Entschlüsselungsfehler.\nBitte versuchen Sie es erneut.',

  // Mail-Service Fehler (70-79)
  [ApiErrorCode.MAIL_SEND_FAILED]: 'E-Mail konnte nicht versendet werden.\nBitte kontaktieren Sie den Support.',
  [ApiErrorCode.MAIL_TEMPLATE_ERROR]: 'E-Mail-Vorlagenfehler.\nBitte kontaktieren Sie den Support.',

  // Datenbankoperationen (80-89)
  [ApiErrorCode.DATABASE_ERROR]: 'Datenbankfehler.\nBitte versuchen Sie es später erneut.',
  [ApiErrorCode.UPDATE_FAILED]: 'Aktualisierung fehlgeschlagen.\nBitte versuchen Sie es erneut.',
  [ApiErrorCode.SAVE_FAILED]: 'Speichern fehlgeschlagen.\nBitte versuchen Sie es erneut.',

  // Autorisierung & Berechtigung (90-99)
  [ApiErrorCode.UNAUTHORIZED_ACCESS]: 'Nicht autorisierter Zugriff.\nBitte melden Sie sich erneut an.',
  [ApiErrorCode.INSUFFICIENT_PERMISSIONS]: 'Unzureichende Berechtigung.\nKontaktieren Sie den Administrator.',

  // Allgemeine Fehler (100+)
  [ApiErrorCode.VALIDATION_ERROR]: 'Ungültige Eingabe.\nBitte überprüfen Sie Ihre Daten.',
   [ApiErrorCode.VALIDATION_MODEL_ERROR]: 'Ungültige Eingabe.\nBitte überprüfen Sie Ihre Daten.',
  [ApiErrorCode.VALIDATION_PYLON_ERROR]: 'Ungültige Eingabe.\nBitte korrigieren Sie Ihre Daten.',
 
  // Bestellungs/Payment spezifisch (110-119)
  [ApiErrorCode.PAYMENT_REQUIRED]: 'Zahlung erforderlich.\nBitte aktualisieren Sie Ihr Abonnement.',
  [ApiErrorCode.SUBSCRIPTION_EXPIRED]: 'Ihr Abonnement ist abgelaufen.\nBitte erneuern Sie es.',
  [ApiErrorCode.INVOICE_ERROR]: 'Rechnungsfehler.\nBitte kontaktieren Sie den Support.',

  // Rate Limiting & Sicherheit (120-129)
  [ApiErrorCode.RATE_LIMIT_EXCEEDED]: 'Zu viele Anfragen.\nBitte warten Sie einen Moment.',
  [ApiErrorCode.SUSPICIOUS_ACTIVITY]: 'Verdächtige Aktivität erkannt.\nIhr Konto wurde vorübergehend gesperrt.',
  [ApiErrorCode.IP_BLOCKED]: 'Ihr Zugriff wurde blockiert.\nKontaktieren Sie den Support.',

  // System Fehler (500+)
  [ApiErrorCode.SERVER_ERROR]: 'Serverfehler.\nBitte versuchen Sie es später erneut.',
  [ApiErrorCode.SERVICE_UNAVAILABLE]: 'Service vorübergehend nicht verfügbar.\nBitte versuchen Sie es später erneut.'
};

/**
 * Helper Funktion zum Extrahieren der Fehlermeldung
 */
export function getErrorMessage(error: any): string {
  // Versuche den Code aus unterschiedlichen Positionen zu lesen
  const rawCode = error?.error?.code ?? error?.code ?? error?.error?.errorCode;
  if (rawCode !== undefined && rawCode !== null) {
    const code = Number(String(rawCode).trim());
    if (!Number.isNaN(code)) {
      const mapped = ERROR_MESSAGES[code];
      if (mapped) {
        return mapped;
      }
      return 'Ein Fehler ist aufgetreten.';
    }
  }

  // Wenn der Server eine Nachricht liefert, nutze sie als Fallback
  if (error?.error?.message) {
    return error.error.message;
  }

  // Server nicht erreichbar (Network Error)
  if (error?.status === 0) {
    return 'Server nicht erreichbar.\nBitte überprüfen Sie Ihre Internetverbindung.';
  }

  // Sonstige HTTP Fehler
  if (error?.status >= 500) {
    return 'Serverfehler.\nBitte versuchen Sie es später erneut.';
  }

  // Häufige 4xx-Fälle abfangen, falls kein Code vorhanden war
  if (error?.status === 401) {
    return 'Nicht autorisiert.\nBitte melden Sie sich erneut an.';
  }
  if (error?.status === 403) {
    return 'Zugriff verweigert.\nSie haben keine Berechtigung für diese Aktion.';
  }
  if (error?.status === 404) {
    return 'Ressource nicht gefunden.\nBitte überprüfen Sie Ihre Eingabe.';
  }
  if (error?.status === 409) {
    return 'Konflikt mit vorhandenen Daten.\nMöglicherweise existiert dieser Eintrag bereits.';
  }
  if (error?.status === 422) {
    return 'Die Daten konnten nicht verarbeitet werden.\nBitte überprüfen Sie Ihre Eingaben.';
  }
  if (error?.status === 400) {
    return 'Ungültige Eingabe.\nBitte überprüfen Sie Ihre Daten.';
  }

  return 'Ein unerwarteter Fehler ist aufgetreten.';
}
