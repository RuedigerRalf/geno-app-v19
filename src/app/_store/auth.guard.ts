import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from './auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  let retval = false;

  const store = inject(Store);
  const IsLoggedIn$ = store.pipe(select(selectIsLoggedIn));
  const router = inject(Router);

  IsLoggedIn$.subscribe(data => {
    if (data == true) {
      retval = true;
    } else {
      retval = false;
    }
  })

  if (!retval) {
    router.navigate(['/login']);
  }

  return retval;
};
