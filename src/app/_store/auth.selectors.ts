import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.isAuthenticated
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  // (state: fromAuth.State): boolean => true
  (state: fromAuth.State): boolean =>
    state.rollen ? !!state.rollen.find((val) => val === 'Admin') : false
);

export const selectHatAdresse = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.hatadresse
);

// Status
export const selectGetStatus = createSelector(
  selectAuthState,
  (state: fromAuth.State): number => state.status
);

export const selectGetToken = createSelector(
  selectAuthState,
  (state: fromAuth.State): string => state.token
);

export const selectGetRefreshToken = createSelector(
  selectAuthState,
  (state: fromAuth.State): string => state.refreshToken
);

export const selectGetUserMail = createSelector(
  selectAuthState,
  (state: fromAuth.State): string => state.email
);

export const selectGetUserFullName = createSelector(
  selectAuthState,
  (state: fromAuth.State): string => state.fullName
);

export const selectGetUserDisplayName = createSelector(
  selectAuthState,
  (state: fromAuth.State): string => state.firstName + ' ' + state.lastName
);

export const selectGetUserDisplayNameWithKd = createSelector(
  selectAuthState,
  (state: fromAuth.State): string =>
    state.firstName + ' ' + state.lastName + ' { ' + state.kundennummer + ' }'
);

export const selectStatus = createSelector(
  selectAuthState,
  (state: fromAuth.State): number => state.status
);

export const selectSex = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => (state.anrede == 'Frau' ? false : true)
);

export const selectStatusText = createSelector(
  selectAuthState,
  (state: fromAuth.State): string => state.statusText
);

export const selectVal4 = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => state.val4
);

