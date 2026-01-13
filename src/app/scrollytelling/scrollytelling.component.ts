import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scrollytelling',
  imports: [CommonModule],
  templateUrl: './scrollytelling.component.html',
  styleUrl: './scrollytelling.component.scss',
})
export class ScrollytellingComponent implements AfterViewInit {
  @ViewChildren('step') steps!: QueryList<ElementRef<HTMLElement>>;

  activeIndex = 0;

  images = [
    '/example-images/Familie Weasley.png',
    '/example-images/Donald John Trump mit Verwandtschaft.png',
    '/example-images/Familie Weasley.png',
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute('data-index')
            );
            this.activeIndex = index;
          }
        });
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    this.steps.forEach((step) => observer.observe(step.nativeElement));
  }
}
