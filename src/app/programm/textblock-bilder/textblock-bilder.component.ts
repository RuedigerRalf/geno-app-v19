import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { MatCardImage } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-textblock-bilder',
    templateUrl: './textblock-bilder.component.html',
    styleUrl: './textblock-bilder.component.scss',
    imports: [MatCardImage, RouterLink]
})
export class TextblockBilderComponent {

  pageTitle = 'Texte und Textblöcke';
  pageUrl = '/programm/textblock-bilder';

  constructor( private meta: Meta, private title: Title ) {
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    // this.seoService.updateCanonicalUrl(this.pageUrl);
  }

    updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Texte und Textblöcke, Bilder, Grafiken, Visualisierung'});
    this.meta.updateTag({ name: 'description', content: 'Im Genogramm Designer können neben Personensymbole ebenfalls Textblöcke und Bilder zur Visualisierung verwendet werden.' });

  }
  
}
