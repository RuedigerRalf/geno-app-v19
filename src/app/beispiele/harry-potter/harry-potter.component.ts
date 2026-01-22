
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import saveAs from 'file-saver';
import { SeoService } from '../../_service/seo.service';
import { DownloadService } from '../../_service/download.service';
import { NotificationService } from '../../_service/notification.service';
import { FeatureData, HarryPotterImages } from '../../_service/common-data.service';

import { LeafletViewerComponent } from '../../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletImage } from '../../_interface/leaflet-image';
import { CallToActionRegister } from '../../_components/call-to-action/call-to-action';

@Component({
  selector: 'app-harry-potter',
  templateUrl: './harry-potter.component.html',
  styleUrl: './harry-potter.component.scss',
  imports: [CallToActionRegister, LeafletViewerComponent]
})

export class HarryPotterComponent {

  pageTitle = 'Harry Potter & Familie Weasley';
  pageUrl = '/beispiele/harry-potter';

  private downloadService = inject(DownloadService);
  private notificationService = inject(NotificationService);
  private seoService = inject(SeoService);
  private meta = inject(Meta);
  private title = inject(Title);

  images: FeatureData[] = []

  constructor() { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
    this.images = HarryPotterImages;
  }

  updateMeta() {
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer, Harry Potter, Familie Weasley, J.K. Rowling, Harry Potter Stammbaum, Weasley Familie, Harry Potter Genogramm, Hogwarts' 
    });
    
    // Description (optimal: 150-160 Zeichen, Grammatik korrigiert)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Familie Weasley Genogramm aus Harry Potter: Visualisierung der Familienbeziehungen aus den Romanen von J.K. Rowling - erstellt mit dem Genogramm Designer.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Genogramm der Weasley-Familie aus Harry Potter mit emotionalen Beziehungen und Familiendynamik visualisiert.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Familie Weasley aus Harry Potter als Genogramm - Familienbeziehungen übersichtlich dargestellt.' 
    });
  }

  onDownload(image: LeafletImage) {
    let filename = image.title.concat(".png");
    let imageIndex = image.downloadIndex;

    this.downloadService.downloadFile2(imageIndex).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
        } else if (event instanceof HttpResponse) {
          let file = new Blob([event.body], { type: 'image/png' });
          saveAs(file, filename);
        }
      },
      error: (err: any) => {
        if (err.error && err.error.message) {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten\n${err.error.message}`, 'error'
          )
        } else {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten`, 'error'
          )
        }
      }
    })
  };

}
