import { HttpInterceptorFn } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { selectGetToken } from '../_store/auth.selectors';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const store = inject(Store);

  // All Auth1 endpoints must stay anonymous (no Bearer token)
  const shouldSkip = req.url.includes('api/Auth1') || req.url.includes('blob.core.windows.net');
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