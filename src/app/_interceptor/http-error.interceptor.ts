import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../_service/notification.service';
import { ApiErrorResponse, getErrorMessage } from '../_interface/ApiError';

/**
 * HTTP Error Interceptor
 * Fängt alle HTTP-Fehler ab und behandelt sie einheitlich
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Logge Fehler für Debugging (in Produktion sollte dies an einen Logging-Service gehen)
      console.error('HTTP Error:', {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        error: error.error,
        timestamp: new Date().toISOString()
      });

      // Bei 401 (Unauthorized) - könnte automatisches Logout triggern
      if (error.status === 401) {
        // Optional: automatisches Logout oder Token-Refresh
        // store.dispatch(AuthActions.logoutUser());
      }

      // Alle Fehlerbehandlung wird in den Effects durchgeführt
      // Der Interceptor ist nur für Logging und spezielle HTTP-Logik (z.B. Token-Refresh bei 401)
      return throwError(() => error);
    })
  );
};
