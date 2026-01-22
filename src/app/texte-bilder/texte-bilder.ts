import { Component, inject, OnInit } from '@angular/core';
import { CallToActionRegister } from '../_components/call-to-action/call-to-action';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';

@Component({
  selector: 'app-texte-bilder',
  imports: [CallToActionRegister],
  templateUrl: './texte-bilder.html',
  styleUrl: './texte-bilder.scss',
})
export class TexteBilder implements OnInit {

  pageTitle = 'Texte und Bilder';

  pageUrl = '/texte-bilder';
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
      content: 'Genogramm Designer, Texte, Bilder, Text hinzufügen, Bild hinzufügen, Genogramm anpassen, Familienaufstellung, Stammbäume, Soziogramm, Genealogie, Ahnenforschung'
    });

    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({
      name: 'description',
      content: 'Texte und Bilder im Genogramm Designer: Fügen Sie individuelle Texte und Bilder hinzu, um Ihre Genogramme und Familienstammbäume anschaulich und informativ zu gestalten.'
    });

    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Erfahren Sie, wie Sie Texte und Bilder in Ihren Genogrammen mit dem Genogramm Designer hinzufügen und anpassen können.'
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Texte und Bilder in Genogrammen hinzufügen und anpassen mit dem Genogramm Designer.'
    });
  }

}