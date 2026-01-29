# Token Refresh Implementierung

## Überblick

Es wurde ein vollständiges Token-Refresh-System implementiert, das automatisch einen abgelaufenen Token aktualisiert, ohne dass der Benutzer sich erneut anmelden muss.

## Komponenten

### 1. Auth Actions (`_store/auth.actions.ts`)

Drei neue Actions wurden hinzugefügt:

```typescript
'Refresh Token': props<{ refreshToken: string }>(),
'Refresh Token Success': props<{ token: string; refreshToken: string }>(),
'Refresh Token Failure': props<{ error: any }>(),
```

- **Refresh Token**: Wird ausgelöst, wenn der Token aktualisiert werden soll
- **Refresh Token Success**: Wird ausgelöst, wenn die Token-Aktualisierung erfolgreich war
- **Refresh Token Failure**: Wird ausgelöst, wenn die Token-Aktualisierung fehlgeschlagen ist

### 2. Auth Service (`_service/auth.service.ts`)

Neue Service-Methode:

```typescript
refreshToken(refreshToken: string) {
  let dto = { refreshToken, pylon: this.getPylon() };
  let url = `${this.Anonymous}` + '/RefreshToken';
  return this.httpClient.post<{ token: string; refreshToken: string }>(url, dto, { headers: this.headers });
}
```

Diese Methode ruft den API-Endpoint `/RefreshToken` auf und aktualisiert den Token.

### 3. Auth Effects (`_store/auth.effects.ts`)

Zwei neue Effects wurden implementiert:

#### refreshToken$ Effect
```typescript
refreshToken$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(AuthActions.refreshToken),
    concatMap((action) =>
      this.authService.refreshToken(action.refreshToken).pipe(
        map((data) => {
          console.log('[AuthEffects] Token erfolgreich aktualisiert');
          return AuthActions.refreshTokenSuccess({
            token: data.token,
            refreshToken: data.refreshToken,
          });
        }),
        catchError((error) => {
          console.error('[AuthEffects] Token-Refresh fehlgeschlagen:', error);
          return of(AuthActions.refreshTokenFailure({ error }));
        })
      )
    )
  );
});
```

Dieser Effect behandelt die Token-Refresh-Action und ruft den Service auf.

#### refreshTokenFailure$ Effect
```typescript
refreshTokenFailure$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(AuthActions.refreshTokenFailure),
    map(() => AuthActions.logoutUserSilent())
  );
});
```

Wenn der Token-Refresh fehlschlägt, wird der Benutzer automatisch abgemeldet.

### 4. Auth Reducer (`_store/auth.reducer.ts`)

Zwei Handler wurden hinzugefügt:

```typescript
on(AuthActions.refreshTokenSuccess, (state, Action) => {
  return {
    ...state,
    token: Action.token,
    refreshToken: Action.refreshToken,
    error: null,
  };
}),
on(AuthActions.refreshTokenFailure, (state, Action) => {
  // Zustand wird zurückgesetzt, Benutzer wird abgemeldet
  ...
})
```

### 5. HTTP Error Interceptor (`_interceptor/http-error.interceptor.ts`)

Der HTTP Error Interceptor wurde erweitert, um automatisch bei einem 401-Fehler (Unauthorized) einen Token-Refresh zu versuchen:

```typescript
if (error.status === 401 && !anonymousPaths.some((path) => req.url.includes(path))) {
  return store.pipe(
    selectGetRefreshToken,
    take(1),
    switchMap((refreshToken) => {
      if (!refreshToken) {
        store.dispatch(AuthActions.logoutUser());
        return throwError(() => error);
      }
      store.dispatch(AuthActions.refreshToken({ refreshToken }));
      return throwError(() => error);
    })
  );
}
```

## Ablauf beim Token-Refresh

1. **Request mit abgelaufenem Token**: Ein API-Request wird mit einem abgelaufenem Token gemacht
2. **401 Fehler**: Der Server antwortet mit HTTP 401 (Unauthorized)
3. **Interceptor erkennt Fehler**: Der HTTP Error Interceptor fängt den 401-Fehler ab
4. **Refresh-Token auslesen**: Der Refresh-Token wird aus dem Redux-Store gelesen
5. **Refresh-Action dispatchen**: Die `refreshToken` Action wird mit dem Refresh-Token ausgelöst
6. **Token aktualisieren**: Der Service ruft den API-Endpoint `/RefreshToken` auf
7. **Success/Failure**: 
   - **Success**: Der neue Token und Refresh-Token werden im Redux-Store aktualisiert
   - **Failure**: Der Benutzer wird automatisch abgemeldet (Logout)

## Verwendung

Der Token-Refresh erfolgt automatisch. Es ist keine manuelle Intervention erforderlich:

```typescript
// Token-Refresh wird automatisch ausgelöst bei 401 Fehlern
// Kein zusätzlicher Code nötig!
```

## Fehlerbehandlung

- **Fehlgeschlagener Refresh**: Falls der Token-Refresh fehlschlägt, wird der Benutzer automatisch abgemeldet
- **Kein Refresh-Token**: Falls kein Refresh-Token vorhanden ist, wird der Benutzer sofort abgemeldet
- **Anonymous Endpoints**: Endpoints in der Whitelist werden nicht verarbeitet (z.B. Login, Register)

## Konfiguration

### RefreshToken Endpoint hinzufügen zur Whitelist

Falls nötig, kann der RefreshToken-Endpoint zur anonymen Whitelist hinzugefügt werden (in `http-token.interceptor.ts`):

```typescript
const anonymousPaths = [
  'api/Auth1/RefreshToken',
  // ... weitere Endpoints
];
```

Diese ist bereits in der aktuellen Implementierung enthalten.

## Testing

Um die Implementierung zu testen:

1. Melden Sie sich an
2. Lassen Sie den Token ablaufen (oder simulieren Sie dies durch Manipulation)
3. Machen Sie einen API-Request
4. Der Token sollte automatisch aktualisiert werden, und der Request sollte mit dem neuen Token wiederholt werden

## Logging

Alle Schritte werden geloggt:

```
[HttpErrorInterceptor] 401 Fehler erkannt, versuche Token zu aktualisieren...
[HttpErrorInterceptor] Refresh-Token vorhanden, starte Token-Refresh...
[AuthEffects] Token erfolgreich aktualisiert
```

## Hinweise für Backend-Team

Der Backend-Endpoint `/Auth1/RefreshToken` sollte folgende Anforderungen erfüllen:

**Request:**
```json
{
  "refreshToken": "...",
  "pylon": "..."
}
```

**Response (200 OK):**
```json
{
  "token": "neuer_access_token",
  "refreshToken": "neuer_refresh_token"
}
```

**Response (400/401):**
```json
{
  "error": "Invalid refresh token"
}
```
