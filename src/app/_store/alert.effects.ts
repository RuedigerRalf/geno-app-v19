import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { NotificationService } from '../_service/notification.service';
import { AuthActions } from '../_store/auth.actions';

import { ApiErrorCode, getErrorMessage } from '../_interface/ApiError';

@Injectable()
export class AlertEffects {

  private actions = inject(Actions);
  private notificationService = inject(NotificationService);

  constructor() { }

  // 'Login User': props<{ username: string; password: string }>(),
  loginUser$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          AuthActions.loginUser
        ),
        tap(() => {
          this.notificationService.showNotification(
            'Ihre Angaben werden überprüft.',
            'info'
          )
        })
      ),
    { dispatch: false }
  );

  // 'Login User Success': props<{ logedUser: LogedUser }>(),
  loginUserSuccess$ = createEffect(
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
        })
      ),
    { dispatch: false }
  );

  // 'Logout User': emptyProps(),
  logoutUser$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.logoutUser),
        tap(() => {
          this.notificationService.showNotification(
            'Bye Bye ... und komm bald wieder',
            'info'
          )
        })
      ),
    { dispatch: false }
  );

  // Silent Logout: keine Notification
  // logoutUserSilent$ = createEffect(
  //   () =>
  //     this.actions.pipe(
  //       ofType(AuthActions.logoutUserSilent),
  //       tap(() => console.log('[AlertEffects] logoutUserSilent ohne Notification'))
  //     ),
  //   { dispatch: false }
  // );

  // 'Register User': props<{ registerDto: RegisterDto }>(),
  // 'Confirm Registration': props<{ ConfirmRegistrationDto: ConfirmRegistrationDto }>() -- kein Hinweis
  // 'Change Email': props<{ changeEmailRequest: ChangeEmailRequest }>(),
  // 'Forgot Password': props<{ forgotPasswordDto: ResetPasswordDto }>(),
  // 'Change Password': props<{ changePasswordDto: ChangePasswordDto }>(),
  // 'Confirm New Mail': props<{ confirmNewEmailDto: ConfirmNewEmailDto}>(),
  // 'Terminate Memmbership': emptyProps(),
  // 'Confirm Terminate Memmbership': props<{ confirmTerminateMembershipDto: ConfirmEmailDto }>(),
  submitData$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          AuthActions.registerUser,
          AuthActions.confirmRegistration,
          AuthActions.changeEmail,
          AuthActions.forgotPassword,
          AuthActions.changePassword,
          AuthActions.confirmNewMail,
          AuthActions.terminateMemmbership,
          AuthActions.confirmTerminateMemmbership
        ),
        tap(() => {
          this.notificationService.showNotification(
            'Einen Moment Geduld bitte. Wir übermitteln Ihre Daten.',
            'info'
          )
        })
      ),
    { dispatch: false }
  );

  // 'Register User Success': emptyProps(),
  // 'Change Email Success': emptyProps(),
  // 'Forgot Password Success': emptyProps(),
  // 'Terminate Memmbership Success': emptyProps(),   
  confirmAction$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          AuthActions.registerUserSuccess,
          AuthActions.changeEmailSuccess,
          AuthActions.forgotPasswordSuccess,
          AuthActions.terminateMemmbershipSuccess
        ),
        tap(() => {
          this.notificationService.showNotification(
            'Besten Dank - bitte prüfen Sie Ihr Postfach\nund bestätigen die Aktion über den zugesandten Link.',
            'info'
          )
        })
      ),
    { dispatch: false }
  );

  // 'Confirm Registration Success': emptyProps(),
  confirmRegistrationSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.confirmRegistrationSuccess),
        tap(() => {
          this.notificationService.showNotification(
            'Ihre Registrierung wurde erfolgreich bestätigt.\nSie können sich nun anmelden.',
            'success'
          )
        })
      ),
    { dispatch: false }
  );

  // 'Change Password With Logout': emptyProps(),    
  changePasswordWithLogout$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.changePasswordWithLogout),
        tap(() => {
          this.notificationService.showNotification(
            'Ihr Kennwort wurde erfolgreich geändert.\nSie werden nun abgemeldet und können sich mit dem neuen Kennwort anmelden.',
            'success'
          )
        })
      ),
    { dispatch: false }
  );

  // 'Confirm New Mail Success with Logout': emptyProps(),
  confirmNewMailSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.confirmNewMailWithLogout),
        tap(() => {
          this.notificationService.showNotification(
            'Ihre E-Mail wurde erfolgreich geändert.\nSie werden nun abgemeldet und können sich mit der neuen E-Mail anmelden.',
            'success'
          )
        })
      ),
    { dispatch: false }
  );

  // 'Confirm Terminate Memmbership with Logout': emptyProps(),
    confirmTerminateMemmbershipWithLogout$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.confirmTerminateMemmbershipWithLogout),
        tap(() => {
          this.notificationService.showNotification(
            'Ihre Mitgliedschaft wurde erfolgreich beendet.',
            'success'
          )
        })
      ),
    { dispatch: false }
  );

  // 'Return to homepage': emptyProps(),
  returnToHomepage$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthActions.returnToHomepage),
        tap(() => {
          this.notificationService.showNotification(
            'Die Registrierung wurde abgebrochen.\nSie werden zur Startseite weitergeleitet.',
            'info'
          )
        })
      ),
    { dispatch: false }
  );

  // Fehlerbehandlung bei Authentifizierungsaktionen
  // 'Register User Failure': props<{ error: any }>(),
  // 'Login User Failure': props<{ error: any }>(),
  // 'Confirm Registration Failure': props<{ error: any }>(),
  // 'Change Email Failure': props<{ error: any }>(),
  // 'Change Email Failure': props<{ error: any }>(),
  // 'Forgot Password Failure': props<{ error: any }>(),
  // 'Change Password Failure': props<{ error: any }>(),
  // 'Confirm New Mail Failure': props<{ error: any }>(),
  // 'Terminate Memmbership Failure': props<{ error: any }>(),
  // 'Confirm Terminate Memmbership Failure': props<{ error: any }>(),

  _Failure$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(
          AuthActions.registerUserFailure,
          AuthActions.loginUserFailure,
          AuthActions.confirmRegistrationFailure,
          AuthActions.confirmNewMailFailure,
          AuthActions.forgotPasswordFailure,
          AuthActions.changePasswordFailure,
          AuthActions.confirmNewMailFailure,
          AuthActions.terminateMemmbershipFailure,
          AuthActions.confirmTerminateMemmbershipFailure
        ),
        tap((action) => {
          const err = action.error;
          let message = '';
          let severity: 'error' | 'warn' | 'info' = 'error';

          if (err instanceof HttpErrorResponse) {
            message = getErrorMessage(err);

            // Spezifische Codes können die Severity anpassen
            if (err.error?.code === ApiErrorCode.EMAIL_ALREADY_CONFIRMED) {
              severity = 'info';
            }
            if (err.error?.code === ApiErrorCode.ACCOUNT_NOT_CONFIRMED) {
              severity = 'warn';
            }
          } else {
            // Allgemeine Fehlerbehandlung für Nicht-HTTP-Fehler
            message = 'Unerwarteter Fehler.\nBitte versuchen Sie es erneut.';
          }

          this.notificationService.showNotification(message, severity);
        })
      ),
    { dispatch: false }
  );
}
