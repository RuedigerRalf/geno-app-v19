import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import saveAs from 'file-saver';
import { SeoService } from '../../_service/seo.service';
import { DownloadService } from '../../_service/download.service';
import { NotificationService } from '../../_service/notification.service';
import { BritischeMonarchenImages, FeatureData } from '../../_service/common-data.service';

import { LeafletViewerComponent } from '../../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletImage } from '../../_interface/leaflet-image';

@Component({
  selector: 'app-englische-monarchen',
  templateUrl: './englische-monarchen.component.html',
  styleUrl: './englische-monarchen.component.scss',
  imports: [CommonModule, RouterLink, LeafletViewerComponent]
})
export class EnglischeMonarchenComponent implements OnInit {

  pageTitle = 'Britische und Englische Monarchen';
  pageUrl = '/beispiele/englische-monarchen';

  @ViewChild('viewer', { static: true }) viewerRef!: ElementRef;

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
    this.images = BritischeMonarchenImages;
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm-Designer, Britische und Englische Monarchen, Charls III, Heinrich VIII, Englisches Königshaus, Elisabeth II' });
    this.meta.updateTag({ name: 'description', content: 'Die britische Monarchie von Heinrich VIII. bis zum heutigen König Charls III. Eine der ältesten Dynastin der Welt in einer klaren, sofort zu erfassenden Darstellung.' });
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

