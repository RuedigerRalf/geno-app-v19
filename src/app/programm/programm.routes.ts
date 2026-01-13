import { Routes } from "@angular/router";
import { ProgrammComponent } from "./programm.component";
import { UeberblickComponent } from "./ueberblick/ueberblick.component";
import { SymbolpalettenComponent } from "./symbolpaletten/symbolpaletten.component";
import { DruckExportComponent } from "./druck-export/druck-export.component";
import { TextblockBilderComponent } from "./textblock-bilder/textblock-bilder.component";
import { NotFoundComponent } from "../not-found/not-found.component";

export const PROGRAMM_ROUTES: Routes = [
    {
            path: '',
            component: ProgrammComponent,
            children: [
                { path: '', redirectTo: 'ueberblick', pathMatch: 'full' },
                { path: 'ueberblick', component: UeberblickComponent },
                { path: 'symbolpaletten', component: SymbolpalettenComponent },
                { path: 'druck-export', component: DruckExportComponent },
                { path: 'textblock-bilder', component: TextblockBilderComponent },
                { path: '**', component: NotFoundComponent }
            ],
        },
]
