import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SeoService } from '../../_service/seo.service';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { getImageSliderDataMustermann, ImageSliderData } from '../../_service/common-data.service';

import { ImageSliderComponent } from '../../_components/image-slider/image-slider.component';

@Component({
    selector: 'app-mustermann',
    templateUrl: './mustermann.component.html',
    styleUrl: './mustermann.component.scss',
    imports: [CommonModule, ImageSliderComponent, RouterLink]
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
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Familie Mustermann' });
    this.meta.updateTag({ name: 'description', content: 'Der Genogramm Designer visualisiert selbst große Familienverbünde mit Leichtigkeit. Als Beispiel die Familie Mustermann' });
  }

}
