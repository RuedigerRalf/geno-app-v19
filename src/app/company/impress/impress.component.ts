import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service';

@Component({
    selector: 'app-impress',
    templateUrl: './impress.component.html',
    styleUrl: './impress.component.scss'
})
export class ImpressComponent {

  pageTitle = 'Impressum';
  pageUrl = '/impressum';

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
    // Robots Tag - Impressum sollte indexiert werden (rechtliche Pflicht & Vertrauen)
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer Impressum, Impressum, Anbieterkennzeichnung, Kontakt, Firmendaten, Verantwortlicher, Herausgeber' 
    });
    
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Impressum von Genogramm Designer: Anbieterkennzeichnung mit Kontaktdaten, Verantwortlichem und rechtlichen Informationen gemäß §5 TMG.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Impressum und Kontaktdaten von Genogramm Designer - Anbieterkennzeichnung gemäß §5 TMG.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Impressum und Kontaktdaten von Genogramm Designer gemäß §5 TMG.' 
    });
  }

}
