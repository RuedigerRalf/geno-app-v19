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
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Datenschutzerklärung' });
    this.meta.updateTag({ name: 'description', content: 'Datenschutzerklärung' });
  }

}
