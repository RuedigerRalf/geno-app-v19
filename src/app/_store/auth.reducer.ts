import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  isAuthenticated: boolean;
  firma1: string;
  firma2: string;
  anrede: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  rollen: string[];
  token: string;
  refreshToken: string;

  status: number;
  statusText: string;
  kundennummer: number;
 
  error: any;
  hatadresse: boolean;
  val4: boolean;
  val6: string;
}
export const initialState: State = {
  isAuthenticated: false,
  firma1: '',
  firma2: '',
  anrede: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  rollen: [],
  token: '',
  refreshToken: '',

  status: 0,
  statusText: 'Interessent',
  kundennummer: -1,
  
  error: null,
  hatadresse: false,
  val4: false,
  val6: '',
};

const featureReducer = createReducer(
  initialState,
  on(AuthActions.loginUserSuccess, (state, Action) => {
    return {
      ...state,
      isAuthenticated: true,
      firma1: Action.logedUser.firma1,
      firma2: Action.logedUser.firma2,
      anrede: Action.logedUser.anrede,
      firstName: Action.logedUser.vorname,
      lastName: Action.logedUser.nachname,
      fullName: Action.logedUser.fullName,
      email: Action.logedUser.email,
      rollen: Action.logedUser.rollen,
      token: Action.logedUser.token,
      refreshToken: Action.logedUser.refreshToken,

      status: Action.logedUser.status,
      statusText: Action.logedUser.statusText,
      kundennummer: Action.logedUser.kundennummer,

      error: null,
      hatadresse: Action.logedUser.hatadresse,
      val4: Action.logedUser.val4,
      val6: Action.logedUser.val6,
    };
  }),
  on(AuthActions.loginUserFailure, (state, Action) => {
    return {
      ...state,
      isAuthenticated: false,
      firma1: '',
      firma2: '',
      anrede: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      rollen: [],
      token: '',
      refreshToken: '',

      status: 0,
      statusText: 'Interessent',
      kundennummer: -1,

      error: Action.error,
      hatadresse: false,
      val4: false,
      val6: '',
    };
  }),
  on(AuthActions.logoutUser, (state, Action) => {
    return {
      ...state,
      isAuthenticated: false,
      firma1: '',
      firma2: '',
      anrede: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      rollen: [],
      token: '',
      refreshToken: '',

      status: 0,
      statusText: '',
      kundennummer: -1,

      error: '',
      hatadresse: false,
      val4: false,
      val6: '',
    };
  }),
  on(AuthActions.logoutUserSilent, (state, Action) => {
    return {
      ...state,
      isAuthenticated: false,
      firma1: '',
      firma2: '',
      anrede: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      rollen: [],
      token: '',
      refreshToken: '',

      status: 0,
      statusText: '',
      kundennummer: -1,

      error: '',
      hatadresse: false,
      val4: false,
      val6: '',
    };
  }),
  on(AuthActions.forgotPasswordSuccess, (state, Action) => {
    return {
      ...state,
      isAuthenticated: false,
      firma1: '',
      firma2: '',
      anrede: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      rollen: [],
      token: '',
      refreshToken: '',

      status: 0,
      statusText: 'Interessent',
      kundennummer: -1,

      error: '',
      hatadresse: false,
      val4: false,
      val6: '',
    };
  }),
  // on(AuthActions.refrehTokenSuccess, (state, Action) => {
  //   return {
  //     ...state,
  //     token: Action.refreshTokenRespDto.token,
  //     refreshToken: Action.refreshTokenRespDto.refreshToken,
  //   };
  // }),
  // on(AuthActions.refrehTokenFailure, (state, Action) => {
  //   return {
  //     ...state,
  //     token: '',
  //     refreshToken: '',
  //   };
  // })
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}

