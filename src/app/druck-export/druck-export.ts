import { Component, inject, OnInit } from '@angular/core';
import { CallToActionRegister } from '../_components/call-to-action/call-to-action';

import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';

@Component({
  selector: 'app-druck-export',
  imports: [CallToActionRegister],
  templateUrl: './druck-export.html',
  styleUrl: './druck-export.scss',
})
export class DruckExport implements OnInit {

  pageTitle = 'Druck und Export';
  pageUrl = '/druck-export';

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
      content: 'Genogramm Designer, Genogramm drucken, Genogramm exportieren, PDF Export, Bild Export, Genogramm als PNG, Genogramm als JPEG, Hochauflösender Export, Druckoptionen'
    });

    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({
      name: 'description',
      content: 'Drucken und Exportieren von Genogrammen: Hochauflösende PDF- und Bildexporte (PNG, JPEG) für professionelle Präsentationen und Dokumentationen mit dem Genogramm Designer.'
    });

    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Erfahren Sie, wie Sie Ihre Genogramme mit dem Genogramm Designer drucken und in hochauflösende Formate wie PDF, PNG und JPEG exportieren können.'
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Drucken und Exportieren von Genogrammen in hochauflösende Formate wie PDF, PNG und JPEG mit dem Genogramm Designer.'
    });

  }
}
