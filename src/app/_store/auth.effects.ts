import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../_service/auth.service';
import { catchError, concatMap, map, of } from 'rxjs';
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
          map(() => {
            return AuthActions.registerUserSuccess();
          }),
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

confirmMail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmRegistration),
      concatMap((action) =>
        this.authService.confirmEmail(action.confirmDto).pipe(
          map(() => {
            return AuthActions.confirmRegistrationSuccess();
          }),
          catchError((error) =>
            of(AuthActions.confirmRegistrationFailure({ error }))
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
          map(() => {
            return AuthActions.forgotPasswordSuccess();
          }),
          catchError((error) =>
            of(AuthActions.forgotPasswordFailure({ error }))
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
          map(() => {
            return AuthActions.changePasswordSuccess();
          }),
          catchError((error) =>
            of(AuthActions.changePasswordFailure({ error }))
          )
        )
      )
    );
  });

  resetEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.changeEmail),
      concatMap((action) =>
        this.authService.resetEmailRequest(action.resetEmailDto).pipe(
          map(() => {
            return AuthActions.changeEmailSuccess();
          }),
          catchError((error) =>
            of(AuthActions.changeEmailFailure({ error }))
          )
        )
      )
    );
  });

  confirmNewMail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmNewMail),
      concatMap((action) =>
        this.authService.confirmNewEmail(action.confirmNewEmailDto).pipe(
          map(() => {
            return AuthActions.confirmNewMailSuccess();
          }),
          catchError((error) =>
            of(AuthActions.confirmNewMailFailure({ error }))
          )
        )
      )
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
          map(() => {
            return AuthActions.terminateMemmbershipSuccess();
          }),
          catchError((error) => of(AuthActions.terminateMemmbershipFailure({ error })))
        )
      )
    );
  });

  confirmterminateMembership$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.confirmTerminateMemmbership),
      concatMap((action) =>
        this.authService.confirmterminateMembership(action.confirmTerminateMembershipDto).pipe(
          map(() => {
            return AuthActions.confirmTerminateMemmbershipSuccess();
          }),
          catchError((error) =>
            of(AuthActions.confirmTerminateMemmbershipFailure({ error }))
          )
        )
      )
    );
  });

}
