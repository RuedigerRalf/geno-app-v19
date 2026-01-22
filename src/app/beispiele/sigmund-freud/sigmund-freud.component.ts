
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import saveAs from 'file-saver';
import { SeoService } from '../../_service/seo.service';
import { DownloadService } from '../../_service/download.service';
import { NotificationService } from '../../_service/notification.service';

import { FeatureData, SigmundFreudImages } from '../../_service/common-data.service';

import { LeafletViewerComponent } from '../../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletImage } from '../../_interface/leaflet-image';
import { CallToActionRegister } from '../../_components/call-to-action/call-to-action';

@Component({
  selector: 'app-sigmund-freud',
  templateUrl: './sigmund-freud.component.html',
  styleUrl: './sigmund-freud.component.scss',
  imports: [CallToActionRegister, LeafletViewerComponent]
})
export class SigmundFreudComponent {

  pageTitle = 'Sigmund Freud';
  pageUrl = '/beispiele/sigmund-freud';

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
    this.images = SigmundFreudImages;
  }

  updateMeta() {
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer, Sigmund Freud, Familie Freud, Psychoanalyse, Stammbaum Freud, Martha Freud, Anna Freud, Freud Genogramm, Sieben Generationen' 
    });
    
    // Description (optimal: 150-160 Zeichen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Sigmund Freud Genogramm über 7 Generationen: Visualisierung der Familie des Begründers der Psychoanalyse mit dem Genogramm Designer.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: 'Sigmund Freud - Familie über 7 Generationen' });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Familienaufstellung von Sigmund Freud über sieben Generationen: Von Martha und Anna Freud bis zu den heutigen Nachkommen visualisiert.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Sigmund Freud Familie über 7 Generationen - vom Begründer der Psychoanalyse bis heute.' 
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
