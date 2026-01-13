import { Routes } from "@angular/router";
import { BeispieleComponent } from "./beispiele.component";
import { HarryPotterComponent } from "./harry-potter/harry-potter.component";
import { DonaldTrumpComponent } from "./donald-trump/donald-trump.component";
import { SigmundFreudComponent } from "./sigmund-freud/sigmund-freud.component";
import { HeinrichViiiComponent } from "./heinrich-viii/heinrich-viii.component";
import { EnglischeMonarchenComponent } from "./englische-monarchen/englische-monarchen.component";
import { VerwandtschaftsbeziehungenComponent } from "./verwandtschaftsbeziehungen/verwandtschaftsbeziehungen.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { MustermannComponent } from "./mustermann/mustermann.component";

export const BEISPIELE_ROUTES: Routes = [
    {
        path: '', component: BeispieleComponent,
        children: [
            { path: '', redirectTo: 'harry-potter', pathMatch: 'full' },
            { path: 'harry-potter', component: HarryPotterComponent },
            { path: 'donald-trump', component: DonaldTrumpComponent },
            { path: 'sigmund-freud', component: SigmundFreudComponent },
            { path: 'heinrich-viii', component: HeinrichViiiComponent },
            { path: 'englische-monarchen', component: EnglischeMonarchenComponent },
            { path: 'verwandtschaftsbeziehungen', component: VerwandtschaftsbeziehungenComponent },
            { path: 'mustermann', component: MustermannComponent },
            { path: '**', component: NotFoundComponent }
        ],

    }
]