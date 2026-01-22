
import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import saveAs from 'file-saver';
import { SeoService } from '../../_service/seo.service';
import { DownloadService } from '../../_service/download.service';
import { NotificationService } from '../../_service/notification.service';
import { DonaldTrumpImages, FeatureData } from '../../_service/common-data.service';

import { LeafletViewerComponent } from '../../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletImage } from '../../_interface/leaflet-image';
import { CallToActionRegister } from '../../_components/call-to-action/call-to-action';

@Component({
  selector: 'app-donald-trump',
  templateUrl: './donald-trump.component.html',
  styleUrl: './donald-trump.component.scss',
  imports: [LeafletViewerComponent, CallToActionRegister]
})
export class DonaldTrumpComponent implements OnInit {

  pageTitle = 'Donald Trump';
  pageUrl = '/beispiele/donald-trump';

  private downloadService = inject(DownloadService);
  private notificationService = inject(NotificationService);
  private seoService = inject(SeoService);
  private meta = inject(Meta);
  private title = inject(Title);

  images: FeatureData[] = []

  constructor() { }

  ngOnInit() {
    // SEO: Title und Meta-Tags setzen
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
    
    this.images = DonaldTrumpImages;
  }

  updateMeta() {
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer, Donald Trump, Familienaufstellung, US-Präsident, Trump Familie, Trump Organisation, Trump Ehefrauen, Trump Verwandtschaft, Stammbaum Trump, Trump Vorfahren' 
    });
    
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Donald Trump Genogramm: Visualisierung der Trump-Familie mit deutschen Wurzeln. Ehefrauen, Kinder, Enkel und Vorfahren des 45. US-Präsidenten übersichtlich dargestellt.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Familienaufstellung von Donald Trump: Von den deutschen Vorfahren bis zu Kindern und Enkeln - visualisiert mit dem Genogramm Designer.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Donald Trump Genogramm mit Familie, Vorfahren und deutschen Wurzeln.' 
    });
  }

  onDownload(image: LeafletImage) {
    let filename = image.title.concat(".png");
    let imageIndex = image.downloadIndex;

    this.downloadService.downloadFile2(imageIndex).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          //  this.progress2019 = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          // Save the downloaded file
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
