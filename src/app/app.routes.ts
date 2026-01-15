import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FunktionenComponent } from './funktionen/funktionen.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ImpressComponent } from './company/impress/impress.component';
import { GdprComponent } from './company/gdpr/gdpr.component';
import { KontaktComponent } from './company/kontakt/kontakt.component';
import { FaqComponent } from './company/faq/faq.component';
import { BildnachweiseComponent } from './company/bildnachweise/bildnachweise.component';
import { Home2Component } from './home2/home2.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ConfirmMailComponent } from './auth/confirm-mail/confirm-mail.component';
import { ConfirmNewEmailComponent } from './auth/confirm-new-email/confirm-new-email.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ResetEmailComponent } from './auth/reset-email/reset-email.component';
import { ConfirmTerminationComponent } from './auth/confirm-termination/confirm-termination.component';
import { DarstellungComponent } from './darstellung/darstellung.component';
import { Home3Component } from './home3/home3.component';
import { Home4Component } from './home4/home4.component';
import { LizenzierungComponent } from './lizenzierung/lizenzierung.component';
import { TechnischeVoraussetzungenComponent } from './technische-voraussetzungen/technische-voraussetzungen.component';
import { ScrollytellingComponent } from './scrollytelling/scrollytelling.component';
import { Workflow1Component } from './workflow1/workflow1.component';
import { Workflow2Component } from './workflow2/workflow2.component';
import { Workflow3Component } from './workflow3/workflow3.component';
import { Workflow4Component } from './workflow4/workflow4.component';
import { HeroComponent } from './hero/hero.component';
import { Workflow5Component } from './workflow5/workflow5.component';
import { Workflow6Component } from './workflow6/workflow6.component';
import { Workflow7Component } from './workflow7/workflow7.component';
import { ProgramComponent } from './program/program.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'funktionen', component: FunktionenComponent },
  { path: 'darstellung', component: DarstellungComponent },
  { path: 'program', component: ProgramComponent },
  { path: 'programm', loadChildren: () => import('./programm/programm.routes').then((m) => m.PROGRAMM_ROUTES) },
  { path: 'lizenzierung', component: LizenzierungComponent },
  // { path: 'technische-voraussetzungen', component: TechnischeVoraussetzungenComponent },
  { path: 'beispiele', loadChildren: () => import('./beispiele/beispiele.routes').then((m) => m.BEISPIELE_ROUTES) },

  { path: 'home2', component: Home2Component },
  { path: 'home3', component: Home3Component },
  { path: 'home4', component: Home4Component },
  { path: 'scrollytelling', component: ScrollytellingComponent },
  { path: 'workflow1', component: Workflow1Component },
  { path: 'workflow2', component: Workflow2Component },
  { path: 'workflow3', component: Workflow3Component },
  { path: 'workflow4', component: Workflow4Component },
  { path: 'workflow5', component: Workflow5Component },
  { path: 'workflow6', component: Workflow6Component },
  { path: 'workflow7', component: Workflow7Component },
  
  { path: 'hero', component: HeroComponent },

  // company
  { path: 'impressum', component: ImpressComponent },
  { path: 'gdpr', component: GdprComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'fragen-und-antworten', component: FaqComponent },
  { path: 'bildnachweise', component: BildnachweiseComponent },
  // auth
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'confirm-email', component: ConfirmMailComponent },
  { path: 'confirm-new-email', component: ConfirmNewEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-email', component: ResetEmailComponent },
  { path: 'confirm-termination', component: ConfirmTerminationComponent },


  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
