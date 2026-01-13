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
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm-Designer, Bildnachweise' });
    this.meta.updateTag({ name: 'description', content: 'Bildnachweise' });
  }

}
