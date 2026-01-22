import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { DialogData } from '../../../_interface/Dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-konto-schliessen',
    templateUrl: './konto-schliessen.component.html',
    styleUrl: './konto-schliessen.component.scss',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton]
})
export class KontoSchliessenComponent {

  constructor(
    public dialogRef: MatDialogRef<KontoSchliessenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close('0');
  }

  confirm() {
    this.dialogRef.close('1');
  }
  
}
