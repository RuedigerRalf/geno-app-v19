# Error Handling Guide - Best Practices

## Übersicht

Dieses Projekt verwendet eine strukturierte, mehrschichtige Fehlerbehandlung für professionelle API-Kommunikation.

## Architektur

```
API Response
    ↓
HTTP Error Interceptor (httpErrorInterceptor)
    ↓
Service (z.B. AuthService)
    ↓
Effects (z.B. AuthEffects)
    ↓
Alert Effects (AlertEffects)
    ↓
Notification Service
    ↓
User
```

## 1. API Error Response Format

### Backend sollte folgendes Format verwenden:

```csharp
// Erfolg
return Ok(data);

// Fehler mit strukturiertem Format
return BadRequest(new { 
  code = 10, 
  message = "E-Mail wurde bereits bestätigt.",
  details = "Optionale zusätzliche Details",
  timestamp = DateTime.UtcNow
});
```

### Frontend Interface:

```typescript
interface ApiErrorResponse {
  code: number;      // Eindeutiger Error Code
  message: string;   // User-freundliche Nachricht
  details?: string;  // Optional: Technische Details
  timestamp?: string;// Optional: Zeitstempel
}
```

## 2. Error Codes (ApiErrorCode Enum)

Kategorisierte Error Codes für bessere Wartbarkeit:

- **10-19**: Registrierung & E-Mail Bestätigung
- **20-29**: Login & Authentifizierung
- **30-39**: Password Reset
- **40-49**: E-Mail Änderung
- **50-59**: Membership
- **100+**: Allgemeine Fehler

### Beispiele:

```typescript
export enum ApiErrorCode {
  EMAIL_ALREADY_CONFIRMED = 10,
  INVALID_CONFIRMATION_TOKEN = 11,
  TOKEN_EXPIRED = 12,
  INVALID_CREDENTIALS = 20,
  ACCOUNT_NOT_CONFIRMED = 21,
  // ...
}
```

## 3. HTTP Error Interceptor

**Datei**: `src/app/_interceptor/http-error.interceptor.ts`

### Aufgaben:
- Fängt **alle** HTTP-Fehler zentral ab
- Loggt Fehler (in Produktion an Logging-Service senden)
- Behandelt generische HTTP-Status-Codes (500, 503, 0, etc.)
- Kann automatische Actions triggern (z.B. Logout bei 401)

### Vorteile:
- ✅ Keine Fehler gehen verloren
- ✅ Zentrale Logging-Stelle
- ✅ Konsistente Behandlung von Netzwerkfehlern

## 4. Alert Effects

**Datei**: `src/app/_store/alert.effects.ts`

### Aufgaben:
- Hört auf Failure-Actions
- Extrahiert strukturierte Error Codes
- Zeigt benutzerfreundliche Notifications

### Besonderheiten:
- **Severity-Anpassung**: z.B. "E-Mail bereits bestätigt" als 'info' statt 'error'
- **Priorisierung**: Strukturierte API-Errors > HTTP Status Messages > Generic Messages
- **Fallback-Strategie**: Immer eine Nachricht anzeigen

## 5. Best Practices für Entwickler

### Backend-Entwicklung

✅ **DO:**
```csharp
return BadRequest(new { 
  code = 10, 
  message = "E-Mail wurde bereits bestätigt." 
});
```

❌ **DON'T:**
```csharp
return BadRequest("Email already confirmed");  // Unstrukturiert
```

### Frontend-Entwicklung

✅ **DO:**
```typescript
// Service bleibt simpel - keine Error-Behandlung
confirmRegistration(body: ConfirmRegistrationDto) {
  let url = `${this.Anonymous}` + '/ConfirmEmail';
  return this.httpClient.post(url, body);
}

// Effects fangen Fehler
confirmRegistration$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(AuthActions.confirmRegistration),
    concatMap((action) =>
      this.authService.confirmRegistration(action.ConfirmRegistrationDto).pipe(
        map(() => AuthActions.confirmRegistrationSuccess()),
        catchError((error) => 
          of(AuthActions.confirmRegistrationFailure({ error }))
        )
      )
    )
  );
});
```

❌ **DON'T:**
```typescript
// Service sollte keine Notifications anzeigen
confirmRegistration(body: ConfirmRegistrationDto) {
  return this.httpClient.post(url, body).pipe(
    catchError(err => {
      this.notificationService.show('Fehler!');  // ❌
      return throwError(err);
    })
  );
}
```

## 6. Neue Error Codes hinzufügen

### Schritt 1: Error Code definieren
```typescript
// src/app/_interface/ApiError.ts
export enum ApiErrorCode {
  // ... bestehende Codes
  MY_NEW_ERROR = 60,  // Neue Kategorie oder passende Nummer
}
```

### Schritt 2: Benutzerfreundliche Nachricht hinzufügen
```typescript
export const ERROR_MESSAGES: Record<number, string> = {
  // ... bestehende Messages
  [ApiErrorCode.MY_NEW_ERROR]: 
    'Eine benutzerfreundliche Beschreibung.\nMit Zeilenumbruch falls nötig.',
};
```

### Schritt 3: Backend implementieren
```csharp
return BadRequest(new { 
  code = 60, 
  message = "Eine benutzerfreundliche Beschreibung." 
});
```

### Schritt 4: Optional - Spezielle Severity
```typescript
// In alert.effects.ts
if (apiError.code === 60) {
  severity = 'warn';  // Statt 'error'
}
```

## 7. Testing

### Unit Tests für Error Handling

```typescript
it('should show correct message for EMAIL_ALREADY_CONFIRMED', () => {
  const error = new HttpErrorResponse({
    error: { code: 10, message: 'E-Mail already confirmed' },
    status: 400
  });
  
  const message = getErrorMessage(error);
  expect(message).toBe('E-Mail wurde bereits bestätigt.\nSie können sich direkt anmelden.');
});
```

## 8. Monitoring & Logging

### Produktion Setup (Empfohlen):

```typescript
// In httpErrorInterceptor
console.error('HTTP Error:', {
  status: error.status,
  url: error.url,
  error: error.error,
  timestamp: new Date().toISOString()
});

// In Produktion ersetzen durch:
// loggingService.logError(error);
// sentryService.captureException(error);
```

## 9. Zusammenfassung der Vorteile

| Vorher | Nachher |
|--------|---------|
| Generische Fehlermeldungen | Spezifische, hilfreiche Nachrichten |
| Nur HTTP-Status-Codes | Strukturierte Error Codes |
| Fehlerbehandlung überall verstreut | Zentrale, konsistente Behandlung |
| Schwer wartbar | Einfach erweiterbar |
| Kein Logging | Zentrales Logging |
| Alle Fehler sind "error" | Unterschiedliche Severity (error/warn/info) |

## 10. Checkliste für neue Features

- [ ] Neue Error Codes im Backend definiert
- [ ] Error Codes im Frontend Enum hinzugefügt
- [ ] Benutzerfreundliche Nachrichten erstellt
- [ ] Alert Effects bei Bedarf angepasst
- [ ] Unit Tests geschrieben
- [ ] Dokumentation aktualisiert

## Beispiel: Kompletter Flow

```
1. User klickt "Registrierung bestätigen"
   ↓
2. Component dispatcht Action: confirmRegistration
   ↓
3. Effect ruft Service-Methode auf
   ↓
4. Service sendet HTTP-Request zur API
   ↓
5. API antwortet: BadRequest { code: 10, message: "..." }
   ↓
6. HTTP Error Interceptor loggt den Fehler
   ↓
7. Effect fängt den Fehler: catchError
   ↓
8. Effect dispatcht: confirmRegistrationFailure({ error })
   ↓
9. Alert Effect hört auf confirmRegistrationFailure
   ↓
10. Alert Effect extrahiert code: 10
   ↓
11. Alert Effect findet passende Nachricht im ERROR_MESSAGES
   ↓
12. Alert Effect setzt severity: 'info' (da bereits bestätigt)
   ↓
13. NotificationService zeigt Info-Toast
   ↓
14. User sieht: "E-Mail wurde bereits bestätigt. Sie können sich direkt anmelden."
```

## Support

Bei Fragen zur Fehlerbehandlung:
1. Prüfen Sie die Error Codes in `ApiError.ts`
2. Schauen Sie sich die Alert Effects an
3. Testen Sie mit den Browser DevTools

---
**Letzte Aktualisierung**: Januar 2026
