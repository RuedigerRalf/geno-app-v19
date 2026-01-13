import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArbeitenMitGrossenGenogrammen, BearbeitenAnpassen, PersonenBeziehungen, SymboleBeziehungstypen, UebersichtStruktur, ProdData } from '../_service/common-data.service';
import { SeoService } from '../_service/seo.service';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GalleryCardComponent } from '../_components/gallery-card/gallery-card.component';

@Component({
  selector: 'app-funktionen',
  imports: [RouterLink, CommonModule, GalleryCardComponent],
  templateUrl: './funktionen.component.html',
  styleUrl: './funktionen.component.scss',
  standalone: true
})
export class FunktionenComponent implements OnInit {
  pageTitle = 'Genogramme Designer - Funktionen';
  pageUrl = '/funktionen';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  personenBeziehungen: ProdData[] = []
  symboleBeziehungstypen: ProdData[] = []
  bearbeitenAnpassen: ProdData[] = []
  arbeitenMitGrossenGenogrammen: ProdData[] = []
  uebersichtStruktur: ProdData[] = []

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

    this.personenBeziehungen = PersonenBeziehungen;
    this.symboleBeziehungstypen = SymboleBeziehungstypen;
    this.bearbeitenAnpassen = BearbeitenAnpassen;
    this.arbeitenMitGrossenGenogrammen = ArbeitenMitGrossenGenogrammen;
    this.uebersichtStruktur = UebersichtStruktur;
  }

}
