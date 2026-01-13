import { FormGroup } from '@angular/forms';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NotificationService } from '../../_service/notification.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { CookieSelection } from '../../_interface/cookie-selection';

@Component({
  selector: 'app-cookie-dialog',
  imports: [FormsModule, ReactiveFormsModule, MatAccordion, MatExpansionModule, MatDialogModule, MatSlideToggleModule, MatButtonModule],
  templateUrl: './cookie-dialog.component.html',
  styleUrl: './cookie-dialog.component.scss'
})
export class CookieDialogComponent {

    @Inject(MAT_DIALOG_DATA)
  public dialogRef = inject(MatDialogRef<CookieDialogComponent>);

  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  private ssrCookieService = inject(SsrCookieService);

    cookieData: CookieSelection = { necessary: true, functional: false, statistics: false, marketing: false };

  _form: FormGroup = this.fb.group({
    necessary: [true],
    functional: [false],
    statistics: [false],
    marketing: [false]
  });

  constructor() {
    this._form.patchValue({
      necessary: this.cookieData.necessary,
      functional: this.cookieData.functional,
      statistics: this.cookieData.statistics,
      marketing: this.cookieData.marketing,
    });
  }

  saveNecessary() {
    let data: CookieSelection = {
      necessary: true,
      functional: false,
      statistics: false,
      marketing: false,
    };
    this.closeDialog(data);
  }

  saveAll() {
    let data: CookieSelection = {
      necessary: true,
      functional: true,
      statistics: true,
      marketing: true,
    };
    this.closeDialog(data);
  }

  onFormSubmit(value: any): void {
    let data: CookieSelection = {
      necessary: value.necessary,
      functional: value.functional,
      statistics: false,
      marketing: value.marketing,
    };
    this.closeDialog(data);
  }

  closeDialog(data: CookieSelection) {
    this.ssrCookieService.set(`necessary`, JSON.stringify(data.necessary), 365);
    this.ssrCookieService.set(`functional`, JSON.stringify(data.functional), 365);
    this.ssrCookieService.set(`statistics`, JSON.stringify(false), 365);
    this.ssrCookieService.set(`marketing`, JSON.stringify(data.marketing), 365);
    this.dialogRef.close(data);
  }

  onChange(e: any) {
    this.notificationService.showNotification(
      `Hinweis: Notwendige Cookies müssen gewählt werden`,
      'info'
    );
    this._form.controls['necessary'].setValue(true);
    e.source.checked = true;
  }


}
