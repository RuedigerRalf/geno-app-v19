import { HttpInterceptorFn } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { selectGetToken } from '../_store/auth.selectors';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const store = inject(Store);

  // Whitelist of endpoints that must stay anonymous (no Bearer token)
  const anonymousPaths = [
    'api/Auth1/RegisterUser',
    'api/Auth1/ConfirmRegistration',
    'api/Auth1/Login',
    'api/Auth1/ResetPasswordRequest',
    'api/Auth1/ChangePassword',
    'api/Auth1/ConfirmNewEmail',
    'api/Auth1/ConfirmTerminateMembership',
    'api/Auth1/extern-contact-mail'
  ];

  const shouldSkip = anonymousPaths.some((path) => req.url.includes(path)) || req.url.includes('blob.core.windows.net');
  if (shouldSkip) {
    return next(req);
  }

  let _token: string = '';
  store.pipe(select(selectGetToken))
    .subscribe((val) => (_token = val));

  if (_token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_token}`
      }
    });
  }

  return next(req);
};