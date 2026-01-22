import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service';

@Component({
    selector: 'app-gdpr',
    templateUrl: './gdpr.component.html',
    styleUrl: './gdpr.component.scss'
})
export class GdprComponent {

  pageTitle = 'Datenschutzerklärung';
  pageUrl = '/gdpr';

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
    // Robots Tag - Datenschutzerklärungen sollten indexiert werden (Transparenz & Vertrauen)
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer Datenschutz, Datenschutzerklärung, DSGVO, Datenschutz, Privacy Policy, Datenverarbeitung, Personenbezogene Daten, Datensicherheit' 
    });
    
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Datenschutzerklärung von Genogramm Designer: Informationen zur Verarbeitung personenbezogener Daten nach DSGVO. Transparent und verständlich.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Datenschutzinformationen zum Genogramm Designer: Wie wir Ihre Daten verarbeiten und schützen - DSGVO-konform.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Datenschutzerklärung: Informationen zur Datenverarbeitung nach DSGVO.' 
    });
  }

}
