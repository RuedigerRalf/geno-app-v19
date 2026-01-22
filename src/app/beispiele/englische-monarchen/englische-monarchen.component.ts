
import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import saveAs from 'file-saver';
import { SeoService } from '../../_service/seo.service';
import { DownloadService } from '../../_service/download.service';
import { NotificationService } from '../../_service/notification.service';
import { BritischeMonarchenImages, FeatureData } from '../../_service/common-data.service';

import { LeafletViewerComponent } from '../../_components/leaflet-viewer/leaflet-viewer.component';
import { LeafletImage } from '../../_interface/leaflet-image';
import { CallToActionRegister } from '../../_components/call-to-action/call-to-action';

@Component({
  selector: 'app-englische-monarchen',
  templateUrl: './englische-monarchen.component.html',
  styleUrl: './englische-monarchen.component.scss',
  imports: [CallToActionRegister, LeafletViewerComponent]
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
    // Robots Tag
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Keywords (Tippfehler korrigiert: Charles statt Charls)
    this.meta.updateTag({ 
      name: 'keywords', 
      content: 'Genogramm Designer, Britische Monarchen, Englische Monarchen, Charles III, Heinrich VIII, Elisabeth II, Königshaus England, Britische Königsfamilie, Stammbaum Monarchen' 
    });
    
    // Description (optimal: 150-160 Zeichen, Tippfehler korrigiert)
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Britische Monarchie von Heinrich VIII. bis König Charles III. Übersichtliche Darstellung einer der ältesten Dynastien der Welt im Genogramm Designer.' 
    });
    
    // Open Graph Tags für Social Media
    this.meta.updateTag({ property: 'og:title', content: this.pageTitle });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Britische und englische Monarchen seit 1485: Von den Tudors bis zu Charles III. Komplette Visualisierung der königlichen Dynastie.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: `https://genogramm-designer.de${this.pageUrl}` });
    
    // Twitter Card Tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.meta.updateTag({ 
      name: 'twitter:description', 
      content: 'Britische Monarchie: Heinrich VIII. bis Charles III. - Übersichtlich visualisiert im Genogramm.' 
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

