import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthActions } from './auth.actions';

@Injectable()
export class RouteEffects {

  private actions$ = inject(Actions);
  private router = inject(Router);
  
  constructor() {}

  gohome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginUserSuccess),
        tap(() => this.router.navigate(['/userdata']))
      ),
    { dispatch: false }
  );
  
    gologin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.registerUserSuccess,
          AuthActions.changePasswordSuccess,
          AuthActions.confirmNewMailSuccess
        ),
        tap(() => {
          setTimeout(() => this.router.navigate(['/login']), 3000)
        })
      ),
    { dispatch: false }
  );

  goToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.logoutUser,
          AuthActions.registerUserSuccess,
          AuthActions.registerUserFailure,
          AuthActions.confirmRegistrationFailure,
          AuthActions.confirmRegistrationSuccess,
          AuthActions.loginUserFailure,
          AuthActions.returnToHomepage,
          AuthActions.confirmRegistrationFailure,
          AuthActions.changePasswordFailure,
          AuthActions.forgotPasswordSuccess,
          AuthActions.forgotPasswordFailure,
          AuthActions.changeEmailFailure,
          AuthActions.changeEmailSuccess,
          AuthActions.confirmNewMailFailure,
          AuthActions.confirmTerminateMemmbershipSuccess,
          AuthActions.confirmTerminateMemmbershipFailure
        ),
        tap(() => this.router.navigate(['/home']))
      ),
    { dispatch: false }
  );

}
