import { inject, Injectable } from '@angular/core';
import { NotifierComponent } from '../_components/notifier/notifier.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonDataTextValue, duration } from './common-data.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  dauer: CommonDataTextValue[] = duration;

  private snackbar = inject(MatSnackBar);

  constructor() { }

  showNotification(displayText: string, messageType: 'error' | 'success' | 'warn' | 'info' | 'default') {
    let dauer = this.dauer.find((t) => t.text === messageType)?.value;
    if (dauer === undefined) dauer = 5000;
    let panelClass = messageType;

    this.snackbar.openFromComponent(NotifierComponent, {
      data: displayText,
      duration: dauer,
      verticalPosition: 'bottom',
      panelClass: panelClass
    });
  }
  
}
