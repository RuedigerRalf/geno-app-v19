import { HttpInterceptorFn } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { selectGetToken } from '../_store/auth.selectors';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const store = inject(Store);

  if (req.url.includes('api/Auth1')) {
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