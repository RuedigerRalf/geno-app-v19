
import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SeoService } from '../_service/seo.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CallToActionRegister } from '../_components/call-to-action/call-to-action';

@Component({
    selector: 'app-lizenzierung',
    templateUrl: './lizenzierung.component.html',
    styleUrl: './lizenzierung.component.scss',
    imports: [MatTooltipModule, CallToActionRegister]
})
export class LizenzierungComponent implements OnInit {

  pageTitle = 'Lizenzierung & Preise';
  pageUrl = '/lizenzierung';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  constructor() { }
  
  ngOnInit() {
    // SEO: Title und Meta-Tags setzen
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords (Tippfehler korrigiert: Kommunen, Einrichtungen)
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer Lizenz, Lizenzierung, Preise, Software Lizenz, Rabatte, Bildungsrabatt, Studenten, Behörden, Kommunen, Landkreise, Jugendämter, Wohlfahrtsverbände, Einzel-Lizenz, Mehrfachlizenz' 
    });
    
    // Description (optimal: 150-160 Zeichen, Tippfehler korrigiert)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Genogramm Designer Lizenzierung: Preise, Rabatte für Studenten, Behörden und Einrichtungen. Flexible Lizenzmodelle für Ihre Bedürfnisse - transparent & fair.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Flexible Lizenzmodelle für den Genogramm Designer: Rabatte für Studenten, Behörden und Einrichtungen. Faire Preise, transparente Konditionen.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.pageTitle} - Genogramm Designer` });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Lizenzierung & Preise: Rabatte für Studenten, Behörden und Einrichtungen. Transparent und fair.' 
    });
  }
  
}
