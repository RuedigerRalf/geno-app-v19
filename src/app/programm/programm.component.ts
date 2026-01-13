import { Component } from '@angular/core';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-programm',
    templateUrl: './programm.component.html',
    styleUrl: './programm.component.scss',
    imports: [MatTabNav, MatTabLink, RouterLinkActive, RouterLink, MatTabNavPanel, RouterOutlet]
})
export class ProgrammComponent {

  navLinks = [
    { link: 'ueberblick', label: 'Programm Überblick', index: 0 },
    { link: 'symbolpaletten', label: 'Symbolpaletten', index: 1 },
    { link: 'textblock-bilder', label: 'Textblöcke & Bilder', index: 2 },
    { link: 'druck-export', label: 'Druck & Export', index: 3 }
  ];
}
