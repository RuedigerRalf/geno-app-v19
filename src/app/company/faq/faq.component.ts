import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss',
    imports: [MatAccordion, MatExpansionPanel, MatExpansionPanelHeader]
})
export class FaqComponent {

  pageTitle = 'Häufig gestellte Fragen';
  pageUrl = '/fragen-und-antworten';

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
    this.meta.updateTag({ name: 'description', content: 'Fragen zur REgistrierung un dzur Installation des Genogramm Designer.' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Häufig gestellte Fragen' });
  }

}
