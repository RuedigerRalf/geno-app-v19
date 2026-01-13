import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  pageTitle = '404 - Seite nicht gefunden';
  pageUrl = '/404';
  
  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);
  
  imagePath: string  = '/not-found/grit-sucht.jpg';

  constructor() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
  }
  updateMeta() {
    this.meta.updateTag({ name: 'description', content: '404 - Seite nicht gefunden' });
    this.meta.updateTag({ name: 'keywords', content: 'Seite nicht gefunden, Page not found' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }

  ngOnInit(): void {
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }
}
