import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { MatCardImage } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-symbolpaletten',
    templateUrl: './symbolpaletten.component.html',
    styleUrl: './symbolpaletten.component.scss',
    imports: [MatCardImage, RouterLink]
})
export class SymbolpalettenComponent {

  pageTitle = 'Im Genogramm Designer enthaltene Symbole';
  pageUrl = '/programm/symbolpaletten';

  constructor( private meta: Meta, private title: Title ) {
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    // this.seoService.updateCanonicalUrl(this.pageUrl);
  }

    updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Symbolpaletten, sexuelle Orientierung, Geschlecht, Familienbeziehung, Familienkonstellation, Genogramm, Soziogramm, Symbole, Symbole für Genogramm, Symbole für Soziogramm, Symbole für Familienbeziehung'});
    this.meta.updateTag({ name: 'description', content: 'Die im Genogramm Designer enthaltenen Symbolpaletten gestatten es jede gewünschte Person oder Personenkonstellation in einem Genogramm oder Soziogramm abzubilden.' });
  }

}
