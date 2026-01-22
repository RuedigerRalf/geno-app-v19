import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';

@Component({
  selector: 'app-dienstleistung',
  imports: [RouterLink],
  templateUrl: './dienstleistung.html',
  styleUrl: './dienstleistung.scss',
})
export class Dienstleistung implements OnInit {

  pageTitle = 'Professionelle Genogramm-Erstellung';
  pageUrl = '/dienstleistung';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    // SEO: Title und Meta-Tags setzen
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
      content: 'Genogramm Dienstleistung, Professionelle Genogramme, Genogramm erstellen lassen, Genogramm Service, Familienaufstellung Service, Genogramm Experte, Individuelle Genogramme'
    });
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({
      name: 'description',
      content: 'Lassen Sie Ihr professionelles Genogramm von Experten erstellen. Unser Service bietet individuelle Genogramme für Familienaufstellungen und mehr.'
    });
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Professionelle Genogramm-Erstellung durch Experten. Individuelle Genogramme für Ihre Familienaufstellungen und Analysen.'
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Professionelle Genogramm-Erstellung durch Experten. Individuelle Genogramme für Ihre Familienaufstellungen und Analysen.'
    });
  }
}
