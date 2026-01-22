import { Routes } from "@angular/router";
import { AuthGuard } from "../_store/auth.guard";

import { NotFoundComponent } from "../not-found/not-found.component";
import { UserdataComponent } from "./userdata.component";
import { BenutzerComponent } from "./benutzer/benutzer.component";
import { DownloadComponent } from "./download/download.component";
import { BestellungComponent } from "./bestellung/bestellung.component";
import { FaqComponent } from "./faq/faq.component";

export const USERDATA_ROUTES: Routes = [
    {
        path: '', component: UserdataComponent, canActivate: [AuthGuard],
        children: [
        { path: '', redirectTo: 'benutzer', pathMatch: 'full' },
        { path: 'benutzer', component: BenutzerComponent, canActivate: [AuthGuard] },
        { path: 'download', component: DownloadComponent, canActivate: [AuthGuard] },
        { path: 'bestellung', component: BestellungComponent, canActivate: [AuthGuard] },
        { path: 'fragen', component: FaqComponent, canActivate: [AuthGuard] },
        { path: '**', component: NotFoundComponent }
        ],

    }
]