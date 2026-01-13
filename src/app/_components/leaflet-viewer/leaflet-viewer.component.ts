import { Component, Input, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { LeafletImage } from '../../_interface/leaflet-image';

@Component({
  selector: 'app-leaflet-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaflet-viewer.component.html',
  styleUrl: './leaflet-viewer.component.scss'
})
export class LeafletViewerComponent implements AfterViewInit, OnDestroy {
  
  @Input() images: LeafletImage[] = [];
  @Input() showNavigation: boolean = true;
  @Input() showDownloadButton: boolean = true;
  @Input() mapId: string = 'leaflet-map-' + Math.random().toString(36).substr(2, 9);
  
  @Output() downloadClicked = new EventEmitter<LeafletImage>();
  
  currentImageIndex = 0;
  currentOverlay: any;
  
  private map: any;
  private L: any;
  private initialBounds: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && this.images.length > 0) {
      setTimeout(async () => {
        this.L = await import('leaflet');
        
        this.map = this.L.map(this.mapId, {
          crs: this.L.CRS.Simple,
          minZoom: -2,
          maxZoom: 4,
          zoomControl: true,
          attributionControl: false
          // attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        });

        // Custom Reset View Control hinzufügen
        this.addResetViewControl();

        // Erstes Bild laden
        this.switchImage();
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
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

  onDownload() {
    this.downloadClicked.emit(this.currentImage);
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
