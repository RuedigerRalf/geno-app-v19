import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-workflow6',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow6.component.html'
})
export class Workflow6Component implements AfterViewInit, OnDestroy {
  
  @ViewChildren('stepSection') stepSections!: QueryList<ElementRef>;
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