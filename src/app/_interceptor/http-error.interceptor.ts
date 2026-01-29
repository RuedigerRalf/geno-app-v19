import { HttpErrorResponse, HttpInterceptorFn, HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectGetRefreshToken } from '../_store/auth.selectors';
import { AuthActions } from '../_store/auth.actions';

/**
 * HTTP Error Interceptor
 * Fängt alle HTTP-Fehler ab und behandelt sie einheitlich
 * Bei 401 (Unauthorized) wird versucht, den Token zu aktualisieren
 */

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const store = inject(Store);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Logge Fehler für Debugging (in Produktion sollte dies an einen Logging-Service gehen)
      // console.error('HTTP Error:', {
      //   status: error.status,
      //   statusText: error.statusText,
      //   url: error.url,
      //   error: error.error,
      //   timestamp: new Date().toISOString()
      // });

      // Bei 401 (Unauthorized) - versuche Token zu aktualisieren
      // Aber nicht bei Auth1 Endpoints (diese sind anonymous)
      if (error.status === 401 && !req.url.includes('api/Auth1')) {
        // console.log('[HttpErrorInterceptor] 401 Fehler erkannt, versuche Token zu aktualisieren...');
        
        let refreshToken: string = '';
        store.select(selectGetRefreshToken).subscribe((token) => {
          refreshToken = token;
        });

        if (!refreshToken) {
          // console.warn('[HttpErrorInterceptor] Kein Refresh-Token vorhanden, Logout wird eingeleitet');
          store.dispatch(AuthActions.logoutUser());
          return throwError(() => error);
        }

        // console.log('[HttpErrorInterceptor] Refresh-Token vorhanden, starte Token-Refresh...');
        store.dispatch(AuthActions.refreshToken({ refreshToken }));
        
        // Werfe den ursprünglichen Fehler, damit die Request fehlschlägt
        // Nach dem Token-Refresh kann der Request manuell wiederholt werden
        return throwError(() => error);
      }

      // Alle anderen Fehlerbehandlung wird in den Effects durchgeführt
      return throwError(() => error);
    })
  );
};
