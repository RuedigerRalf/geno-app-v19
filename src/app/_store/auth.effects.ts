import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, exhaustMap } from 'rxjs';

import { AuthService } from '../_service/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  constructor() { }

  // register
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.registerUser),
      concatMap((action) =>
        this.authService.register(action.registerDto).pipe(
          map(() => AuthActions.registerUserSuccess()),
          catchError((error) => of(AuthActions.registerUserFailure({ error })))
        )
      )
    );
  });

    confirmRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmRegistration),
      concatMap((action) =>
        this.authService.confirmRegistration(action.confirmRegistrationDto).pipe(
          map(() => AuthActions.confirmRegistrationSuccess()),
          catchError((error) => of(AuthActions.confirmRegistrationFailure({ error }))
          )
        )
      )
    );
  });

  // login
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginUser),
      concatMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((data) => AuthActions.loginUserSuccess({ logedUser: data })),
          catchError((error) => of(AuthActions.loginUserFailure({ error })))
        )
      )
    );
  });

  // logout
  logou$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutUser),
      ),
    { dispatch: false }
  );

  forgotPasswordRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      concatMap((action) =>
        this.authService.forgotPassword(action.forgotPasswordDto).pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError((error) => of(AuthActions.forgotPasswordFailure({ error }))
          )
        )
      )
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.changePassword),
      concatMap((action) =>
        this.authService.changePassword(action.changePasswordDto).pipe(
          map(() => AuthActions.changePasswordWithLogout()),
          catchError((error) => of(AuthActions.changePasswordFailure({ error }))
          )
        )
      )
    );
  });

  changePasswordWithLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.changePasswordWithLogout),
      map(() => AuthActions.logoutUserSilent())
    );
  });

  changeEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.changeEmail),
      exhaustMap((action) => {
        // console.log('[AuthEffects] changeEmail$ effect ausgelöst', action);
        return this.authService.resetEmailRequest(action.changeEmailRequestDto).pipe(
          map(() => AuthActions.changeEmailSuccess()),
          catchError((error) => of(AuthActions.changeEmailFailure({ error })))
        );
      })
    );
  });

  confirmNewMail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmNewMail),
      exhaustMap((action) => {
        // console.log('[AuthEffects] confirmNewMail$ effect ausgelöst', action);
        return this.authService.confirmNewEmail(action.confirmNewEmailDto).pipe(
          map(() => AuthActions.confirmNewMailWithLogout()),
          catchError((error) => of(AuthActions.confirmNewMailFailure({ error })))
        );
      })
    );
  });

  confirmNewMailWithLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmNewMailWithLogout),
      map(() => AuthActions.logoutUserSilent())
    );
  });


  terminateMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.terminateMembership),
      concatMap((action) =>
        this.authService.terminateMembershipRequest().pipe(
          map(() => AuthActions.terminateMembershipSuccess()),
          catchError((error) => of(AuthActions.terminateMembershipFailure({ error })))
        )
      )
    );
  });

  confirmterminateMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmTerminateMembership),
      concatMap((action) =>
        this.authService.confirmterminateMembership(action.confirmterminateMembershipDto).pipe(
          map(() => AuthActions.confirmTerminateMembershipWithLogout()),
          catchError((error) => of(AuthActions.confirmTerminateMembershipFailure({ error }))
          )
        )
      )
    );
  });

  confirmTerminateMembershipWithLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmTerminateMembershipWithLogout),
      map(() => AuthActions.logoutUserSilent())
    );
  });

  refreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      concatMap((action) =>
        this.authService.refreshToken(action.refreshToken).pipe(
          map((data) => {
            // console.log('[AuthEffects] Token erfolgreich aktualisiert');
            return AuthActions.refreshTokenSuccess({
              token: data.token,
              refreshToken: data.refreshToken,
            });
          }),
          catchError((error) => {
            // console.error('[AuthEffects] Token-Refresh fehlgeschlagen:', error);
            return of(AuthActions.refreshTokenFailure({ error }));
          })
        )
      )
    );
  });

  refreshTokenFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.refreshTokenFailure),
      map(() => AuthActions.logoutUserSilent())
    );
  });
  
}
