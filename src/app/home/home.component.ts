import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  pageTitle = 'Genogramm Designer';
  pageUrl = '/';

 private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  constructor() {
    this.title.setTitle(this.pageTitle);

    this.meta.addTags([
      { name: 'keywords', content: 'Genogramm Designer, Genogramm, Soziogramm, Stammbaum, Familienaufstellung, Genealogie, Ahnenforschung, Familienchronik, Verwandtschaftsanalyse, Verwandtschaftsdiagramm, Familienstammbaum' },
      { name: 'description', content: 'Die führende Genogramm Software für detaillierte Familienaustellungen und die Visualisierung von Familiengeschichten. Ein einfach zu bedienende Tools für die Erstellung, Anpassung und Analyse von Genogrammen. Starten Sie noch heute und erfassen Sie komplexe Zusammenhänge mit Leichtigkeit' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'eDoc Systems' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2025-10-10', scheme: 'YYYY-MM-DD' },
    ]);
  }

  ngOnInit(): void {
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

}
