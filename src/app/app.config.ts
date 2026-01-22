import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { httpTokenInterceptor } from './_interceptor/http-token.interceptor';
import { JwtModule } from "@auth0/angular-jwt";
import { provideNativeDateAdapter } from '@angular/material/core';

import { metaReducers, reducers } from './_store';

import { AuthEffects } from './_store/auth.effects';
import { RouteEffects } from './_store/route.effects';
import { AlertEffects } from './_store/alert.effects';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([httpTokenInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled'
    })),
    provideClientHydration(withEventReplay()), 
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideStore(reducers, { metaReducers }),
    provideEffects([AuthEffects, RouteEffects, AlertEffects]), 
    provideRouterStore(), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          // allowedDomains: ["example.com"],
          // disallowedRoutes: ["http://example.com/examplebadroute/"],
        },
      }),
    ),
    // { provide: MAT_DATE_LOCALE, useValue: de },
    // { provide: DateAdapter, useClass: DateFnsAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
    // provideDateFnsAdapter(),
  ]
};

