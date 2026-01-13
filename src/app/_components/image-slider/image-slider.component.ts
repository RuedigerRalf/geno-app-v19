import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-slider',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})

export class ImageSliderComponent implements OnInit, OnDestroy {
  @Input() slides: any[] = [];
  @Input() indicatorsVisible = true;
  @Input() animationSpeed = 500;
  @Input() autoPlay = true;
  @Input() autoPlaySpeed = 3000;
  @Input() stopAfterSequence = false;
  @Input() showPlayControls = true;

  currentSlide = 0;
  hidden = false;
  isPlaying = false;
  private autoPlayInterval: any;
  private startSlide = 0;

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    if (this.autoPlayInterval) return;
    
    this.isPlaying = true;
    this.startSlide = this.currentSlide;
    
    this.autoPlayInterval = setInterval(() => {
      this.next(true);
    }, this.autoPlaySpeed);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.isPlaying = false;
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  next(fromAutoPlay = false) {
    let nextSlide = (this.currentSlide + 1) % this.slides.length;
    
    if (fromAutoPlay && this.stopAfterSequence && nextSlide === this.startSlide) {
      this.stopAutoPlay();
      return;
    }
    
    this.jumpToSlide(nextSlide);
  }

  previous() {
    let currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.jumpToSlide(currentSlide);
  }

  jumpToSlide(index: number) {
    this.hidden = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.hidden = false;
    }, this.animationSpeed);
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

}
