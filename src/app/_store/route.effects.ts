import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthActions } from './auth.actions';

@Injectable()
export class RouteEffects {

  private actions$ = inject(Actions);
  private router = inject(Router);

  constructor() { }

  // 'Login User Success': props<{ logedUser: LogedUser }>(),
  loginUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginUserSuccess),
        tap(() => this.router.navigate(['/userdata/benutzer']))
      ),
    { dispatch: false }
  );

  // 'Confirm Registration Success': emptyProps(),
  // 'Change Password With Logout': emptyProps(),
  // 'Confirm New Mail With Logout': emptyProps(),
  gologin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.confirmRegistrationSuccess,
          AuthActions.changePasswordWithLogout,
          AuthActions.confirmNewMailWithLogout
        ),
        tap(() => {
          setTimeout(() => this.router.navigate(['/login']), 2000)
        })
      ),
    { dispatch: false }
  );

  // 'Logout User': emptyProps(),    
  logoutUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.logoutUser,
          AuthActions.logoutUserSilent),
        tap(() => this.router.navigate(['/home'])
        )
      ),
    { dispatch: false }
  );

  // 'Login User Failure': props<{ error: any }>(),
  // 'Register User Success': emptyProps(), 
  // 'Register User Failure': props<{ error: any }>(),
  // 'Confirm Registration Failure': props<{ error: any }>(),
  // 'Return to homepage': emptyProps(),
  // 'Change Email Success': emptyProps(),
  // 'Change Email Failure': props<{ error: any }>(),
  // 'Forgot Password Success': emptyProps(), 
  // 'Forgot Password Failure': props<{ error: any }>(),
  // 'Change Password Failure': props<{ error: any }>(),
  // 'Confirm New Mail Failure': props<{ error: any }>(),
  // 'Terminate Memmbership Success': emptyProps(),
  // 'Terminate Memmbership Failure': props<{ error: any }>(),
  // 'Confirm Terminate Memmbership with Logout': emptyProps(),
  // 'Confirm Terminate Memmbership Failure': props<{ error: any }>(),

  goToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginUserFailure,
          AuthActions.logoutUser,
          AuthActions.logoutUserSilent,
          AuthActions.registerUserSuccess,
          AuthActions.registerUserFailure,
          AuthActions.confirmRegistrationFailure,
          AuthActions.returnToHomepage,
          AuthActions.changeEmailSuccess,
          AuthActions.changeEmailFailure,
          AuthActions.forgotPasswordSuccess,
          AuthActions.forgotPasswordFailure,
          AuthActions.changePasswordFailure,
          AuthActions.confirmNewMailFailure,
          AuthActions.terminateMemmbershipSuccess,
          AuthActions.terminateMemmbershipFailure,
          AuthActions.confirmTerminateMemmbershipWithLogout,
          AuthActions.confirmTerminateMemmbershipFailure
        ),
        tap(() => {
          setTimeout(() => this.router.navigate(['/home']), 2000)
        })
      ),
    { dispatch: false }
  );

}
