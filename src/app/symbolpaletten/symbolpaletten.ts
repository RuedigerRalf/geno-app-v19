
import { Component, inject, OnInit } from '@angular/core';
import { CallToActionRegister } from '../_components/call-to-action/call-to-action';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';

@Component({
  selector: 'app-symbolpaletten',
  imports: [CallToActionRegister],
  templateUrl: './symbolpaletten.html',
  styleUrl: './symbolpaletten.scss',
})
export class Symbolpaletten implements OnInit {

  pageTitle = 'Symbolpaletten';
  pageUrl = '/symbolpaletten';

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
      content: 'Genogramm Designer, Symbolpaletten, Genogramm Symbole, Familienbeziehungen Symbole, Genogramm Zeichen, Genogramm Legende, Genogramm Symbolübersicht'
    });
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({
      name: 'description',
      content: 'Entdecken Sie die Symbolpaletten des Genogramm Designers: Umfangreiche Sammlung von Genogramm-Symbolen zur Darstellung von Familienbeziehungen und -strukturen.'
    });
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Erkunden Sie die vielfältigen Symbolpaletten des Genogramm Designers zur effektiven Visualisierung von Familienbeziehungen und -dynamiken.'
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Entdecken Sie die Symbolpaletten des Genogramm Designers zur Darstellung komplexer Familienstrukturen und -beziehungen.'
    });
  }

}