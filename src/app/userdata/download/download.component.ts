import { Component, inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

import saveAs from 'file-saver';

import { NotificationService } from '../../_service/notification.service';
import { SeoService } from '../../_service/seo.service'
import { DownloadService } from '../../_service/download.service';

import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrl: './download.component.scss',
    imports: [MatButton, MatProgressBar]
})
export class DownloadComponent {

  pageTitle = 'Download';
  pageUrl = '/benutzer/download';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);
  private downloadService = inject(DownloadService);
  private notificationService = inject(NotificationService)

  progress2024 = 0;
  progress2019 = 0;
  progress2015 = 0;

  constructor( ) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: "noindex" });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Download' },);
    this.meta.updateTag({ name: 'description', content: 'Download' });
  }

  download2024(): void {
    this.downloadService.downloadFile(0).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.progress2024 = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          let file = new Blob([event.body], { type: 'application/x-zip-compressed' });
          saveAs(file, 'Genogramm Designer 2024.zip');
          this.progress2024 = 0;
        }
      },
      error: (err: any) => {
        if (err.error && err.error.error) {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten\n${err.error.error}`, 'error'
          )
        } else {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten`, 'error'
          )
        }
        this.progress2024 = 0;
      }
    })
  };

  download2019(): void {
    this.downloadService.downloadFile(1).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.progress2019 = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          let file = new Blob([event.body], { type: 'application/x-zip-compressed' });
          saveAs(file, 'Genogramm Designer 2019.zip');
          this.progress2019 = 0;
        }
      },
      error: (err: any) => {
        if (err.error && err.error.error) {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten\n${err.error.error}`, 'error'
          )
        } else {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten`, 'error'
          )
        }
        this.progress2019 = 0;
      }
    })
  };

  download2015(): void {
    this.downloadService.downloadFile(2).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          this.progress2015 = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          let file = new Blob([event.body], { type: 'application/x-zip-compressed' });
          saveAs(file, 'Genogramm Designer 2015.zip');
          this.progress2015 = 0;
        }
      },
      error: (err: any) => {
        if (err.error && err.error.error) {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten\n${err.error.error}`, 'error'
          )
        } else {
          this.notificationService.showNotification(
            `Fehler beim Speichern der Daten`, 'error'
          )
        }
        this.progress2015 = 0;
      }
    })
  };
}
