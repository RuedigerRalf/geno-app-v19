
import { Component, inject } from '@angular/core';
import { SeoService } from '../../_service/seo.service';
import { Meta, Title } from '@angular/platform-browser';

import { getImageSliderDataMustermann, ImageSliderData } from '../../_service/common-data.service';

import { ImageSliderComponent } from '../../_components/image-slider/image-slider.component';
import { CallToActionRegister } from '../../_components/call-to-action/call-to-action';

@Component({
    selector: 'app-mustermann',
    templateUrl: './mustermann.component.html',
    styleUrl: './mustermann.component.scss',
    imports: [ImageSliderComponent, CallToActionRegister]
})
export class MustermannComponent {

  images: ImageSliderData[] = [];

  pageTitle = 'Familie Mustermann';
  pageUrl = '/beispiele/mustermann';

  private seoService = inject(SeoService);
  private meta = inject(Meta);
  private title = inject(Title);

  constructor() {  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
    
    this.images = getImageSliderDataMustermann;
  }

  updateMeta() {
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer, Familie Mustermann, Stammbaum Beispiel, Familienaufstellung Demo, Genogramm Beispiel, Große Familien, Mehrgenerationen Familie' 
    });
    
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Familie Mustermann Genogramm: Beispiel für große Familienverbünde über mehrere Generationen. Demonstration der Visualisierungsmöglichkeiten im Genogramm Designer.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Beispiel-Genogramm der Familie Mustermann: Visualisierung großer Familienstrukturen über Generationen hinweg mit dem Genogramm Designer.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Familie Mustermann: Demo-Genogramm für große Familienverbünde über mehrere Generationen.' 
    });
  }

}
