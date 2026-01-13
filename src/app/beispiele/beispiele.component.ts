import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { SeoService } from '../_service/seo.service';

@Component({
  selector: 'app-beispiele',
  templateUrl: './beispiele.component.html',
  styleUrl: './beispiele.component.scss',
  imports: [CommonModule, MatTabNav, MatTabLink, RouterLinkActive, RouterLink, MatTabNavPanel, RouterOutlet]
})
export class BeispieleComponent {

  pageTitle = 'Beispiele';
  pageUrl = '/beispiele';

  private seoService = inject(SeoService);
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm-Designer, Genogramm, Familienaufstellung, Beispiele, Donald Trump Genogramm, Sigmund Freud Genogramm, Harry Potter Genogramm, Englische und Britische Monarchen Genogramm, Verwandtschaftsbeziehungen' });
    this.meta.updateTag({ name: 'description', content: 'Die führende Genogramm Software zur Visualisierung von Familiengeschichten. Starten Sie noch heute und erstellen Sie komplexe Familienaufstellungen.' });
  }

  navLinks = [
    { link: 'harry-potter', label: 'Harry Potter & Familie Weasley', index: 0 },
    { link: 'verwandtschaftsbeziehungen', label: 'Verwandtschaftsbeziehungen', index: 1 },
    { link: 'mustermann', label: 'Familie Mustermann', index: 2 },
    { link: 'englische-monarchen', label: 'Englische Monarchen', index: 3 },
    { link: 'heinrich-viii', label: 'Heinrich VIII', index: 4 },
    { link: 'sigmund-freud', label: 'Sigmund Freud', index: 5 },
    { link: 'donald-trump', label: 'Donald Trump', index: 6 },

  ];

}
