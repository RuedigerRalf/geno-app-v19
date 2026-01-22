import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CallToActionRegister } from '../_components/call-to-action/call-to-action';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, CallToActionRegister],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pageTitle = 'Genogramm Designer';
  pageUrl = '/';

 private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  constructor() { }

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
      content: 'Genogramm Designer, Genogramm erstellen, Genogramm Software, Stammbaum, Familienaufstellung, Familienstammbaum, Genogramm online, Soziogramm, Genealogie, Ahnenforschung, Verwandtschaftsdiagramm' 
    });
    
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Genogramm Designer: Die führende Software für Familienaufstellungen und Stammbäume. Erstellen, anpassen und analysieren Sie Genogramme einfach und intuitiv.' 
    });
    
    // Author
    this.meta.updateTag({ name: 'author', content: 'eDoc Systems' });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: 'Genogramm Designer - Professionelle Genogramm Software' });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Erstellen Sie professionelle Genogramme und Familienstammbäume mit der führenden Genogramm Software. Einfach, intuitiv und leistungsstark.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://genogramm-designer.de' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Genogramm Designer' });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Genogramm Designer - Professionelle Genogramm Software' });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Die führende Software für Genogramme und Familienstammbäume. Professionell, einfach, intuitiv.' 
    });
  }

}
