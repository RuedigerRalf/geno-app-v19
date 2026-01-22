import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service'

@Component({
  selector: 'app-bestellung',
  templateUrl: './bestellung.component.html',
  styleUrl: './bestellung.component.scss'
})
export class BestellungComponent implements OnInit {

  pageTitle = 'Bestellung';
  pageUrl = '/benutzer/bestellung';

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
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Bestellung' },);
    this.meta.updateTag({ name: 'description', content: 'Bestellung' });
    this.meta.updateTag({ name: 'robots', content: "noindex" });
  }

}
