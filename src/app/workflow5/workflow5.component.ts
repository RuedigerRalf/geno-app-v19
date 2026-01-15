import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface GalleryStep {
  id: number;          // Der Index für den Active-Check
  label: string;       // Kurze Beschriftung links
  imageFile: string;   // Das Bild rechts
}

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow5.component.html'
})
export class Workflow5Component implements AfterViewInit, OnDestroy {
  
  @ViewChildren('stepSection') stepSections!: QueryList<ElementRef>;
  activeStepIndex = signal(0); // Welcher Schritt ist gerade sichtbar?
  private observer: IntersectionObserver | null = null;

  // Deine bestehenden Schritte (Beispiel)
  // steps = [ ... ]; 

  // DAS NEUE SZENARIO: 5 Bilder für einen kurzen Textbereich
  // Angenommen, deine vorherigen Schritte waren 0, 1, 2. Dann starten wir hier bei 3.
  gallerySteps: GalleryStep[] = [
    { id: 3, label: '1. Standard-Genogramm (S/W)', imageFile: '/example-images/Familie Weasley.png' },
    { id: 4, label: '2. Farbige Hervorhebung', imageFile: '/example-images/Donald John Trump mit Verwandtschaft.png' },
    { id: 5, label: '3. Fokus auf Konflikte', imageFile: '/example-images/Familie Weasley.png' },
    { id: 6, label: '4. Soziales Netzwerk (Soziogramm)', imageFile: '/example-images/Donald John Trump mit Verwandtschaft.png' },
    { id: 7, label: '5. Export-Ansicht (PDF)', imageFile: '/example-images/Familie Weasley.png' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initObserver();
    }
  }

  private initObserver() {
    const options = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // Triggerzone exakt in der Mitte (schmaler Bereich)
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
