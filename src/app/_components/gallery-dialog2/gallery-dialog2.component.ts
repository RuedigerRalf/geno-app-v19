import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'gallery-dialog2',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './gallery-dialog2.component.html',
})
export class GalleryDialog2Component {
  currentIndex = 0;
  animating = false;
  animationDirection: 'left' | 'right' | null = null;

  private startX = 0;

  private dialogRef = inject(MatDialogRef<GalleryDialog2Component>);
  readonly data: any = inject(MAT_DIALOG_DATA);

  constructor() {}

  get currentItem() {
    if (!this.data || !this.data.items || this.data.items.length === 0) {
      console.warn('GalleryDialog2Component: No items available');
      return null;
    }
    return this.data.items[this.currentIndex];
  }

  close() {
    this.dialogRef.close();
  }

  // Pointer Events für Swipe
  onPointerDown(event: PointerEvent) {
    this.startX = event.clientX;
  }

  onPointerUp(event: PointerEvent) {
    const deltaX = event.clientX - this.startX;

    if (Math.abs(deltaX) < 50) return; // minimale Swipe-Distanz

    if (deltaX < 0) this.next();
    else this.prev();
  }

  next() {
    if (this.currentIndex < this.data.items.length - 1 && !this.animating) {
      this.animationDirection = 'left';
      this.triggerAnimation(() => this.currentIndex++);
    }
  }

  prev() {
    if (this.currentIndex > 0 && !this.animating) {
      this.animationDirection = 'right';
      this.triggerAnimation(() => this.currentIndex--);
    }
  }

  private triggerAnimation(callback: () => void) {
    this.animating = true;
    setTimeout(() => {
      callback();
      this.animating = false;
      this.animationDirection = null;
    }, 250);
  }
}

