
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import saveAs from 'file-saver';
import { SeoService } from '../../_service/seo.service';
import { DownloadService } from '../../_service/download.service';
import { NotificationService } from '../../_service/notification.service';
import { FeatureData, HeinrichImages } from '../../_service/common-data.service';

import { LeafletViewerComponent } from '../../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletImage } from '../../_interface/leaflet-image';
import { CallToActionRegister } from '../../_components/call-to-action/call-to-action';

@Component({
    selector: 'app-heinrich-viii',
    templateUrl: './heinrich-viii.component.html',
    styleUrl: './heinrich-viii.component.scss',
    imports: [CallToActionRegister, LeafletViewerComponent]
})
export class HeinrichViiiComponent {
  pageTitle = 'Heinrich VIII';
  pageUrl = '/beispiele/heinrich-viii';

  private downloadService = inject(DownloadService);
  private notificationService = inject(NotificationService);
  private seoService = inject(SeoService);
  private meta = inject(Meta);
  private title = inject(Title);

  images: FeatureData[] = []

  constructor() {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
    this.images = HeinrichImages;
  }

  updateMeta() {
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords (Fehler korrigiert: 6 Ehefrauen, nicht 8)
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer, Heinrich VIII, Heinrich der Achte, Tudor König, Sechs Ehefrauen, Anne Boleyn, Katharina von Aragon, Tudor Dynastie, Englische Geschichte' 
    });
    
    // Description (optimal: 150-160 Zeichen, historisch korrekt: 6 Frauen)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Heinrich VIII. Genogramm mit seinen sechs Ehefrauen und Kindern. Visualisierung der Tudor-Dynastie im Genogramm Designer mit historischen Details.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: 'Heinrich VIII - Genogramm mit 6 Ehefrauen' });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Familienaufstellung von Heinrich VIII: Der Tudor-König mit seinen sechs Ehefrauen und Kindern übersichtlich visualisiert.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Heinrich VIII. mit seinen 6 Ehefrauen: Anne Boleyn, Katharina von Aragon und mehr - als Genogramm.' 
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

