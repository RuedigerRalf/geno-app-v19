import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss',
    imports: [MatAccordion, MatExpansionPanel, MatExpansionPanelHeader]
})
export class FaqComponent {

  pageTitle = 'Häufig gestellte Fragen';
  pageUrl = '/fragen-und-antworten';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  constructor() {
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    // Robots Tag - FAQ-Seiten sind SEO-Gold
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer FAQ, Häufig gestellte Fragen, Genogramm erstellen Hilfe, Installation Genogramm, Registrierung, Support, Anleitung, Genogramm Software Fragen' 
    });
    
    // Description (optimal: 150-160 Zeichen, Tippfehler korrigiert)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'FAQ zum Genogramm Designer: Antworten zu Registrierung, Installation, Bedienung und Lizenzierung. Hilfe und Support für alle häufig gestellten Fragen.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: `${this.pageTitle} (FAQ) - Genogramm Designer` });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Häufig gestellte Fragen zum Genogramm Designer: Registrierung, Installation, Bedienung und mehr - schnell und einfach beantwortet.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'FAQ zum Genogramm Designer: Installation, Registrierung, Bedienung und Support-Fragen beantwortet.' 
    });
  }

}
