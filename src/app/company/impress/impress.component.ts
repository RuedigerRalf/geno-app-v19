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
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Impressum' });
    this.meta.updateTag({ name: 'description', content: 'Impressum' });

  }

}
