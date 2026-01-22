import { Component, inject, TemplateRef } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-presentation-dialog2',
  imports: [MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './presentation-dialog2.component.html',
  styleUrl: './presentation-dialog2.component.scss',
  standalone: true
})
export class PresentationDialog2Component {

  protected readonly TemplateRef = TemplateRef;

  private dialogRef = inject(MatDialogRef<PresentationDialog2Component>);
  readonly data: any = inject(MAT_DIALOG_DATA);

  constructor() { }

  isTemplateRef(value: any): boolean {
    return value instanceof TemplateRef;
  }

  close() { this.dialogRef.close(); }

}
