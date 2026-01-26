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

  // login
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginUser),
      concatMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((data) => {
            // localStorage.setItem('token', data.token);
            // localStorage.setItem('refreshToken', data.refreshToken);
            return AuthActions.loginUserSuccess({ logedUser: data });
          }),
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

  resetPasswordRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      concatMap((action) =>
        this.authService.resetPasswordRequest(action.forgotPasswordDto).pipe(
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
        console.log('[AuthEffects] changeEmail$ effect ausgelöst', action);
        return this.authService.resetEmailRequest(action.changeEmailRequest).pipe(
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
        console.log('[AuthEffects] confirmNewMail$ effect ausgelöst', action);
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

  // refreshToken$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthActions.refrehToken),
  //     concatMap((action) =>
  //       this.authService.refreshToken(action.refreshTokenDto).pipe(
  //         map((data) => {
  //           // localStorage.setItem('token', data.token);
  //           // localStorage.setItem('refreshToken', data.refreshToken);
  //           console.log('refreshToken');
  //           return AuthActions.refrehTokenSuccess({
  //             refreshTokenRespDto: data,
  //           });
  //         }),
  //         catchError((error) =>
  //           of(AuthActions.refrehTokenFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // });

  terminateMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.terminateMemmbership),
      concatMap((action) =>
        this.authService.terminateMembershipRequest().pipe(
          map(() => AuthActions.terminateMemmbershipSuccess()),
          catchError((error) => of(AuthActions.terminateMemmbershipFailure({ error })))
        )
      )
    );
  });

  confirmterminateMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmTerminateMemmbership),
      concatMap((action) =>
        this.authService.confirmterminateMembership(action.confirmterminateMembership).pipe(
          map(() => AuthActions.confirmTerminateMemmbershipWithLogout()),
          catchError((error) => of(AuthActions.confirmTerminateMemmbershipFailure({ error }))
          )
        )
      )
    );
  });

  confirmTerminateMemmbershipWithLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmTerminateMemmbershipWithLogout),
      map(() => AuthActions.logoutUserSilent())
    );
  });
  
}
