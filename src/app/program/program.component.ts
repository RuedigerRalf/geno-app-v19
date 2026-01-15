import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy, signal, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../_service/seo.service';

@Component({
  selector: 'app-program',
  imports: [CommonModule],
  templateUrl: './program.component.html',
  styleUrl: './program.component.scss'
})

export class ProgramComponent implements AfterViewInit, OnDestroy {
  
  @ViewChildren('stepSection') stepSections!: QueryList<ElementRef>;

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);
  
  activeStepIndex = signal(0); 
  private observer: IntersectionObserver | null = null;

  pageTitle = 'So funktioniert der Genogramm Designer';
  pageUrl = '/program/das_programm';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.title.setTitle(this.pageTitle);
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    // this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initObserver();
    }
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'description', content: 'Benutzeroberfläche des Genogramm Designer. Screencasts die die grundlegenden Funktionen und diie einfache Nutzung des Genogramm Designer demonstrieren' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Genogramm, Soziogramm, Programm Oberfläche, How to Videos' });
  }

  private initObserver() {
    const options = {
      root: null,
      // Triggerzone genau in der Mitte, damit der Wechsel präzise ist
      rootMargin: '-45% 0px -45% 0px', 
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            this.activeStepIndex.set(index);
          }
        }
      });
    }, options);

    this.stepSections.forEach(section => {
      this.observer?.observe(section.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
