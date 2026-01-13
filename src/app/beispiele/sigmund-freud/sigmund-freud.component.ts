import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import saveAs from 'file-saver';
import { SeoService } from '../../_service/seo.service';
import { DownloadService } from '../../_service/download.service';
import { NotificationService } from '../../_service/notification.service';

import { FeatureData, SigmundFreudImages } from '../../_service/common-data.service';

import { LeafletViewerComponent } from '../../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletImage } from '../../_interface/leaflet-image';

@Component({
  selector: 'app-sigmund-freud',
  templateUrl: './sigmund-freud.component.html',
  styleUrl: './sigmund-freud.component.scss',
  imports: [CommonModule, RouterLink, LeafletViewerComponent]
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
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm-Designer, Sigmund Freud, Genogramm' });
    this.meta.updateTag({ name: 'description', content: 'Der Genogramm Designer visualisiert selbst große Familienverbünde mit Leichtigkeit. Als Beispiel die Familien von Sigmund Freud über insgesamt sieben Generationen.' });
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
