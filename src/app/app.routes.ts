import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ImpressComponent } from './company/impress/impress.component';
import { GdprComponent } from './company/gdpr/gdpr.component';
import { KontaktComponent } from './company/kontakt/kontakt.component';
import { FaqComponent } from './company/faq/faq.component';
import { BildnachweiseComponent } from './company/bildnachweise/bildnachweise.component';

import { Programm } from './programm/programm';
import { Symbolpaletten } from './symbolpaletten/symbolpaletten';
import { TexteBilder } from './texte-bilder/texte-bilder';
import { DruckExport } from './druck-export/druck-export';
import { LizenzierungComponent } from './lizenzierung/lizenzierung.component';
import { Dienstleistung } from './dienstleistung/dienstleistung'

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ConfirmNewEmailComponent } from './auth/confirm-new-email/confirm-new-email.component';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { ResetEmailComponent } from './auth/reset-email/reset-email.component';
import { ConfirmTerminationComponent } from './auth/confirm-termination/confirm-termination.component';
import { ConfirmRegistration } from './auth/confirm-registration/confirm-registration';

import { AuthGuard } from './_store/auth.guard';
import { Home2 } from './home2/home2';

export const routes: Routes = [
  // Root Route
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'home2',component: Home2 },

  // Redirects für alte Routen
  { path: 'programm/ueberblick', redirectTo: 'programm', pathMatch: 'full' },
  { path: 'programm/symbolpaletten', redirectTo: 'symbolpaletten', pathMatch: 'full' },
  { path: 'programm/druck-export', redirectTo: 'druck-export', pathMatch: 'full' },
  { path: 'programm/textblock-bilder', redirectTo: 'texte-bilder', pathMatch: 'full' },

  // Main Routes
  { path: 'programm', component: Programm },
  { path: 'symbolpaletten', component: Symbolpaletten },
  { path: 'texte-bilder', component: TexteBilder },
  { path: 'druck-export', component: DruckExport },
  { path: 'lizenzierung', component: LizenzierungComponent },
  { path: 'dienstleistung', component: Dienstleistung },
  { path: 'beispiele', loadChildren: () => import('./beispiele/beispiele.routes').then((m) => m.BEISPIELE_ROUTES) },
  
  // Userdata
  { path: 'userdata', loadChildren: () => import('./userdata/userdata.routes').then((m) => m.USERDATA_ROUTES) },
  
  // Company
  { path: 'impressum', component: ImpressComponent },
  { path: 'gdpr', component: GdprComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'fragen-und-antworten', component: FaqComponent },
  { path: 'bildnachweise', component: BildnachweiseComponent },
  
  // Auth
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'confirm-email', component: ConfirmRegistration},
  { path: 'confirm-new-email', component: ConfirmNewEmailComponent },
  { path: 'reset-password', component: ForgotPassword },
  { path: 'reset-email', component: ResetEmailComponent, canActivate: [AuthGuard] },
  { path: 'confirm-termination', component: ConfirmTerminationComponent },

  // 404 - Muss immer am Ende stehen
  { path: '**', component: NotFoundComponent },
];
