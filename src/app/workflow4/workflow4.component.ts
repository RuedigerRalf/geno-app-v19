import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule], // CommonModule für ngClass etc.
  templateUrl: './workflow4.component.html',
  styleUrls: ['./workflow4.component.scss'] // Falls vorhanden
})
export class Workflow4Component implements AfterViewInit, OnDestroy {
  
  // Sammelt alle Elemente ein, die im HTML mit #stepSection markiert sind
  @ViewChildren('stepSection') stepSections!: QueryList<ElementRef>;
  
  // Welcher Schritt ist gerade aktiv? (0 = der erste, 1 = der zweite, usw.)
  activeStepIndex = signal(0);
  
  private observer: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initObserver();
    }
  }

  private initObserver() {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger in der Mitte des Bildschirms
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Wir lesen den Index direkt aus dem HTML-Attribut
          const index = Number(entry.target.getAttribute('data-index'));
          
          // Nur aktualisieren, wenn es eine gültige Zahl ist
          if (!isNaN(index)) {
            this.activeStepIndex.set(index);
          }
        }
      });
    }, options);

    // Observer auf alle gefundenen Sektionen anwenden
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
