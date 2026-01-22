import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service'
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  imports: [MatAccordion, MatExpansionPanel, MatExpansionPanelHeader]
})
export class FaqComponent implements OnInit {

  pageTitle = 'Häufig gestellte Fragen zur Lizenzierung';
  pageUrl = '/benutzer/fragen';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: "noindex" });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Lizenzierung' },);
    this.meta.updateTag({ name: 'description', content: 'Häufig gestellte Fragen zur Lizenzierung' });
  }
}