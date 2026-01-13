
import { Component, inject, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';
import { FeatureData, SigmundFreudImages, HarryPotterImages } from '../_service/common-data.service';

@Component({
  selector: 'app-home3',
  imports: [CommonModule],
  templateUrl: './home3.component.html',
  styleUrl: './home3.component.scss'
})

export class Home3Component implements OnInit, AfterViewInit {

  pageTitle = 'Genogramm Designer - Funktionen';
  pageUrl = '/funktionen';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);

  images: FeatureData[] = []

  currentImageIndex = 0;
  currentOverlay: any;

  private map: any;
  private L: any;
  private initialBounds: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.title.setTitle(this.pageTitle);

    this.meta.addTags([
      { name: 'keywords', content: 'Mnestik, Gregorianischer Kalender, Jüdischer Kalender, Islamischer Kalender, Tri-Kalender, Erinnerung, Erinnern, Vergessen, Gedenktag, Feiertag, Thementag, Aktionstag' },
      { name: 'description', content: 'Mnestik - die mitdenkende Gedächtnis- und Erinnerungs-App. Mnestik speichert alle wichtigen Ereignisse und erinnert dich rechtzeitig daran – schlechtes Gewissen war gestern!' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'eDoc Systems' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2025-04-04', scheme: 'YYYY-MM-DD' },
    ]);
  }

  ngOnInit() {
    this.seoService.updateCanonicalUrl(this.pageUrl);

    this.images = HarryPotterImages;
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(async () => {
        this.L = await import('leaflet');

        this.map = this.L.map('imageMap', {
          crs: this.L.CRS.Simple,
          minZoom: -2,
          maxZoom: 3,
          zoomControl: true,
          attributionControl: false
        });

        // Custom Reset View Control hinzufügen
        this.addResetViewControl();

        // Erstes Bild laden
        this.switchImage();
      }, 0);
    }
  }

  get currentImage() {
    return this.images[this.currentImageIndex];
  }

  get hasPrevious() {
    return this.currentImageIndex > 0;
  }

  get hasNext() {
    return this.currentImageIndex < this.images.length - 1;
  }

  previousImage() {
    if (this.hasPrevious) {
      this.currentImageIndex--;
      this.switchImage();
    }
  }

  nextImage() {
    if (this.hasNext) {
      this.currentImageIndex++;
      this.switchImage();
    }
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
    this.switchImage();
  }

  private addResetViewControl() {
    const L = this.L;
    const map = this.map;
    const component = this;

    const ResetViewControl = L.Control.extend({
      options: { position: 'topleft' },

      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        const button = L.DomUtil.create('a', '', container);

        button.innerHTML = '⌂';
        button.href = '#';
        button.title = 'Zurück zur Startansicht';
        button.style.fontSize = '18px';
        button.style.lineHeight = '30px';
        button.style.width = '30px';
        button.style.height = '30px';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.textDecoration = 'none';
        button.style.color = '#333';

        L.DomEvent.on(button, 'click', function (e: Event) {
          L.DomEvent.stopPropagation(e);
          L.DomEvent.preventDefault(e);
          if (component.initialBounds) {
            map.fitBounds(component.initialBounds);
          }
        });

        return container;
      }
    });

    map.addControl(new ResetViewControl());
  }

  downloadImage() {
    const img = this.currentImage;
    // download logic here
  }

  // Alte Version - zentriert das gesamte Bild
  private switchImage() {
    if (!this.map || !this.L) return;

    if (this.currentOverlay) {
      this.map.removeLayer(this.currentOverlay);
    }

    const img = this.currentImage;
    const bounds: any = [[0, 0], [img.height, img.width]];

    this.currentOverlay = this.L.imageOverlay(img.imageUrl, bounds);
    this.currentOverlay.addTo(this.map);
    this.map.fitBounds(bounds);

    // Initiale Bounds für Reset-Button speichern
    this.initialBounds = bounds;

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

}
