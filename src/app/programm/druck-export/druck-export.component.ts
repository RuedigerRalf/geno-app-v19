import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-druck-export',
    templateUrl: './druck-export.component.html',
    styleUrl: './druck-export.component.scss',
    imports: [RouterLink]
})
export class DruckExportComponent {

  pageTitle = 'Druck und Export';
  pageUrl = '/programm/druck-export';

  constructor(private meta: Meta, private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    // this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'description', content: 'Der Genogramm Designer unterstützt den Anwender mit einer Vielzahl von Druck- und Export-Funktionen bei der Weitergabe von Genogrammen.' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Genogramm, Soziogramm, DRuck und Export Funktionen' });

  }
}
