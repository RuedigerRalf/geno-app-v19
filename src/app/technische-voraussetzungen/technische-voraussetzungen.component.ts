import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';
import { SeoService } from '../_service/seo.service';

@Component({
    selector: 'app-technische-voraussetzungen',
    templateUrl: './technische-voraussetzungen.component.html',
    styleUrl: './technische-voraussetzungen.component.scss',
    imports: [RouterLink, CommonModule]
})
export class TechnischeVoraussetzungenComponent {

  pageTitle = 'Technische Voraussetzungen';
  pageUrl = '/technische-voraussetzungen';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  constructor( ) { }
  
  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

    updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Systemvoraussetzungen, Window 10, Windows 11, Betriebssystem' });
    this.meta.updateTag({ name: 'description', content: 'Die technischen Voraussetzungen um den Genogramm Designer nutzen zu können.' });
  }

}
