import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';
import { SeoService } from '../_service/seo.service';

import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-lizenzierung',
    templateUrl: './lizenzierung.component.html',
    styleUrl: './lizenzierung.component.scss',
    imports: [RouterLink, CommonModule, MatTooltipModule]
})
export class LizenzierungComponent {

  pageTitle = 'Lizenzierung & Preise';
  pageUrl = '/lizenzierung';

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
    this.meta.updateTag({ name: 'description', content: 'Ausführliche Informationen zur Lizenzierung des Genogramm Designer. Listenpreise und mögliche Rabatte für EInrichtungen und Privatpersonen' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Lizenzierung, Preise, Rabatte, Wohlfahrtsverbände, Studenten, Behörden, Kummunen, Landkreise, Jugendämter' });

  }
  
}
