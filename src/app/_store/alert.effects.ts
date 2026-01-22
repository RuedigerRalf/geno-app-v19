import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../_service/auth.service';
import { tap } from 'rxjs';
import { NotificationService } from '../_service/notification.service';
import { AuthActions } from '../_store/auth.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AlertEffects {

  private actions = inject(Actions);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
    
  constructor() {}

  // Register
    register$ = createEffect(
      () =>
        this.actions.pipe(
          ofType(AuthActions.registerUser),
          tap(() =>
            this.notificationService.showNotification(
              'Einen Moment Geduld bitte. Wir übermitteln Ihre Daten.',
              'info'
            )
          )
        ),
      { dispatch: false }
    );

    registerSuccess$ = createEffect(
      () =>
        this.actions.pipe(
          ofType(AuthActions.registerUserSuccess),
          tap(() =>
            this.notificationService.showNotification(
              'Besten Dank - bitte prüfen Sie Ihr Postfach und \nbestätigen Sie Ihre Registrierung',
              'info'
            )
          )
        ),
      { dispatch: false }
    );

    // Login
  _datenPruefen$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          AuthActions.loginUser
        ),
        tap(() =>
          this.notificationService.showNotification(
            'Ihre Angaben werden überprüft.',
            'info'
          )
        )
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.loginUserSuccess),
        tap((action) => {
          switch (action.logedUser.hatadresse) {
            case true:
              this.notificationService.showNotification(
                `Willkommen zurück: ${action.logedUser.vorname}`,
                'success'
              )
              break;
            case false:
              this.notificationService.showNotification(
                `Willkommen zurück: ${action.logedUser.vorname}` +
                '\nWichtig: Bitte vervollständigen Sie Ihre Adressdaten',
                'success'
              )
              break;
          }
        }

        )
      ),
    { dispatch: false }
  );

  // Fehlerbehandlung bei Authentifizierungsaktionen
    _Failure$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          AuthActions.registerUserFailure,
          AuthActions.loginUserFailure,
          AuthActions.changePasswordFailure,
          AuthActions.confirmRegistrationFailure,
          AuthActions.confirmNewMailFailure,
          AuthActions.terminateMemmbershipFailure
        ),
        tap((action) => {
          const err = action.error;
          let message = '';

          if (err instanceof HttpErrorResponse) {
            // HTTP-spezifische Fehlerbehandlung
            switch (err.status) {
              case 400:
                message = 'Ungültige Eingabe.\nBitte überprüfen Sie Ihre Daten.';
                break;
              case 401:
                message = 'Authentifizierung fehlgeschlagen.\nBitte prüfen Sie Ihre Anmeldedaten.';
                break;
              case 403:
                message = 'Zugriff verweigert.\nSie haben keine Berechtigung für diese Aktion.';
                break;
              case 404:
                message = 'Ressource nicht gefunden.\nBitte versuchen Sie es später erneut.';
                break;
              case 409:
                message = 'Konflikt mit vorhandenen Daten.\nMöglicherweise existiert dieser Eintrag bereits.';
                break;
              case 500:
                message = 'Serverfehler.\nBitte versuchen Sie es später erneut.';
                break;
              case 503:
                message = 'Service vorübergehend nicht verfügbar.\nBitte versuchen Sie es später erneut.';
                break;
              case 0:
                message = 'Keine Verbindung zum Server.\nBitte überprüfen Sie Ihre Internetverbindung.';
                break;
              default:
                // Versuche die Server-Message zu verwenden
                if (err.error?.message) {
                  message = `${err.error.message}`;
                } else if (err.error?.statusText) {
                  message = `${err.error.statusText}`;
                } else if (err.message) {
                  message = `${err.message}`;
                } else {
                  message = `Fehler (${err.status}):\nBitte versuchen Sie es später erneut.`;
                }
            }

            // Füge Support-Hinweis bei wiederholten Fehlern hinzu
            if ([500, 503].includes(err.status)) {
              message += '\n\nWenn der Fehler erneut auftaucht,\nwenden Sie sich bitte an unseren Support.';
            }
          } else {
            // Allgemeine Fehlerbehandlung für Nicht-HTTP-Fehler
            message = 'Unerwarteter Fehler.\nBitte versuchen Sie es erneut.';
          }

          this.notificationService.showNotification(message, 'error');
        })
      ),
    { dispatch: false }
  );
}
