import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { GalleryDialog2Component } from '../gallery-dialog2/gallery-dialog2.component';
import { PresentationDialog2Component } from '../presentation-dialog2/presentation-dialog2.component';

import { ProdData } from '../../_service/common-data.service';

@Component({
  selector: 'gallery-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.scss'
})
export class GalleryCardComponent {

  @Input() inputData!: ProdData;

  private dialog = inject(MatDialog);

  constructor() { }

  openDialog() {
    if (this.inputData.children && this.inputData.children.length > 0) {
      // Öffne GalleryDialog mit children
      this.dialog.open(GalleryDialog2Component, {
        data: { items: this.inputData.children },
        maxWidth: '600px',
        width: '90vw',
        panelClass: 'gallery-dialog-panel'
      });
    } else {
      // Öffne PresentationDialog mit inputData als Objekt
      this.dialog.open(PresentationDialog2Component, {
        data: {
          imageUrl: this.inputData.imageUrl,
          imageAlt: this.inputData.imageAlt,
          title: this.inputData.title,
          text: this.inputData.text,
          tags: this.inputData.tags,
        },
        maxWidth: '600px',
        width: '90vw',
        panelClass: 'gallery-dialog-panel'
      });
    }
  }

  // openDialog() { 
  //   this.dialog.open(GalleryDialog2Component, { 
  //     data: { items: this.inputData.children },
  //     // data: {
  //     //   imageUrl: this.data.imageUrl,
  //     //   imageAlt: this.data.imageAlt,
  //     //   title: this.data.title,
  //     //   text: this.data.text,
  //     //   tags: this.data.tags,
  //     // },
  //   // data: { items: this.inputData.children }, 
  //     maxWidth: '600px', 
  //     width: '90vw', 
  //     panelClass: 'gallery-dialog-panel' 
  //   }); 
  // }

}
