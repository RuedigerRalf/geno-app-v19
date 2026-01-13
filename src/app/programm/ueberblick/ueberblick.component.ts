import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ueberblick',
    templateUrl: './ueberblick.component.html',
    styleUrl: './ueberblick.component.scss',
    imports: [RouterLink]
})
export class UeberblickComponent implements OnInit {

  pageTitle = 'Das Programm im Überblick';
  pageUrl = '/programm/ueberblick';

  constructor(private meta: Meta, private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    // this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'description', content: 'Benutzeroberfläche des Genogramm Designer. Screencasts die die grundlegenden Funktionen und diie einfache Nutzung des Genogramm Designer demonstrieren' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Genogramm, Soziogramm, Programm Oberfläche, How to Videos' });
  }

}
