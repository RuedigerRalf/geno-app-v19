import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service';

@Component({
    selector: 'app-bildnachweise',
    templateUrl: './bildnachweise.component.html',
    styleUrl: './bildnachweise.component.scss'
})
export class BildnachweiseComponent {

  pageTitle = 'Bildnachweise';
  pageUrl = '/company/bildnachweise';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  constructor() { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    // Robots Tag - Bildnachweise sind rechtlich relevant und sollten indexiert werden
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer, Bildnachweise, Bildquellen, Urheberrecht, Bildreferenzen, Foto Credits, Lizenzinformationen' 
    });
    
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Bildnachweise und Quellenangaben für Fotos und Grafiken auf genogramm-designer.de. Alle verwendeten Bilder und deren Urheberrechte aufgelistet.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Übersicht aller verwendeten Bilder, Grafiken und deren Urheberrechte auf genogramm-designer.de.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Bildquellen und Urheberrechte aller verwendeten Fotos und Grafiken.' 
    });
  }

}
