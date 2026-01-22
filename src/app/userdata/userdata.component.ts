import { Component } from '@angular/core';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-userdata',
    templateUrl: './userdata.component.html',
    styleUrl: './userdata.component.scss',
    imports: [MatTabNav, MatTabLink, RouterLinkActive, RouterLink, MatTabNavPanel, RouterOutlet]
})
export class UserdataComponent {

  navLinks = [
    { link: 'benutzer', label: 'Benutzer Daten', index: 0 },
    { link: 'download', label: 'Download', index: 1 },
    { link: 'bestellung', label: 'Bestellung', index: 2 },
    { link: 'fragen', label: 'Häufig gestellte Fragen', index: 3 },
  ];

}
