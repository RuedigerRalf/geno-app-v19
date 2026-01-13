import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router'

import { SeoService } from '../_service/seo.service';

import { BilderEinbinden, DarstellungLayout, Drucken, ExportWeiterverwendung, FarbenTexteHervorhebungen, ProdData } from '../_service/common-data.service';

import { GalleryCardComponent } from '../_components/gallery-card/gallery-card.component';

@Component({
  selector: 'app-darstellung',
  imports: [RouterLink, CommonModule, GalleryCardComponent ],
  templateUrl: './darstellung.component.html',
  styleUrl: './darstellung.component.scss',
  standalone: true
})
export class DarstellungComponent {
  pageTitle = 'Genogramme Designer - Darstellung & Ausgabe';
  pageUrl = '/darstellung';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  darstellungLayout: ProdData[] = []
  farbenTexteHervorhebungen: ProdData[] = []
  bilderEinbinden: ProdData[] = []
  drucken: ProdData[] = []
  exportWeiterverwendung: ProdData[] = []

  constructor() {
    this.title.setTitle(this.pageTitle);

    this.meta.addTags([
      { name: 'keywords', content: 'Mnestik, Gregorianischer Kalender, Jüdischer Kalender, Islamischer Kalender, Tri-Kalender, Erinnerung, Erinnern, Vergessen, Gedenktag, Feiertag, Thementag, Aktionstag' },
      { name: 'description', content: 'Mnestik - die mitdenkende Gedächtnis- und Erinnerungs-App. Mnestik speichert alle wichtigen Ereignisse und erinnert dich rechtzeitig daran – schlechtes Gewissen war gestern!' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'eDoc Systems' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2025-04-04', scheme: 'YYYY-MM-DD' },
    ]);
  }

  ngOnInit() {
    this.seoService.updateCanonicalUrl(this.pageUrl);

    this.darstellungLayout = DarstellungLayout;
    this.farbenTexteHervorhebungen = FarbenTexteHervorhebungen;
    this.bilderEinbinden = BilderEinbinden;
    this.drucken = Drucken;
    this.exportWeiterverwendung = ExportWeiterverwendung;
  }
}
