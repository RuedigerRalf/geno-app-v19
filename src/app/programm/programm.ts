import { Component, inject, OnInit } from '@angular/core';
import { CallToActionRegister } from '../_components/call-to-action/call-to-action';

import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';

@Component({
  selector: 'app-programm',
  imports: [CallToActionRegister],
  templateUrl: './programm.html',
  styleUrl: './programm.scss',
})
export class Programm implements OnInit {

  pageTitle = 'Das Programm';
  pageUrl = '/programm';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }
  updateMeta() {
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    // Keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Genogramm Designer, Genogramm Programm, Genogramm Software, Familienaufstellung Software, Stammbaum Programm, Soziogramm Software, Genealogie Programm'
    });
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({
      name: 'description',
      content: 'Entdecken Sie die Funktionen des Genogramm Designers: Intuitive Bedienung, vielfältige Anpassungsmöglichkeiten und professionelle Vorlagen für Ihre Familienaufstellungen.'
    });
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Erfahren Sie mehr über die leistungsstarken Funktionen und Möglichkeiten des Genogramm Designers zur Erstellung professioneller Genogramme und Stammbäume.'
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Entdecken Sie die Funktionen des Genogramm Designers: Intuitive Bedienung, vielfältige Anpassungsmöglichkeiten und professionelle Vorlagen für Ihre Familienaufstellungen.'
    });
  }
}
