import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './src/app/_store/auth.actions';
import { ConfirmRegistrationDto } from './src/app/_interface/ConfirmEmailDto';

/**
 * Beispiel-Komponente: E-Mail Bestätigung
 * 
 * Zeigt wie die neue Error-Behandlung verwendet wird:
 * - Component dispatcht nur die Action
 * - Effects behandeln Success/Failure
 * - Alert Effects zeigen Notifications
 * - Keine Error-Logik in der Component nötig!
 */
@Component({
  selector: 'app-confirm-email',
  standalone: true,
  template: `
    <div class="container">
      <h2>E-Mail Bestätigung</h2>
      
      @if (isProcessing) {
        <p>Ihre E-Mail wird bestätigt...</p>
      }
      
      @if (isConfirmed) {
        <p>Ihre E-Mail wurde erfolgreich bestätigt!</p>
        <button (click)="navigateToLogin()">Zum Login</button>
      }
    </div>
  `
})
export class ConfirmEmailExampleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);

  isProcessing = false;
  isConfirmed = false;

  ngOnInit() {
    // Hole Token und UserId aus der URL
    const token = this.route.snapshot.queryParamMap.get('token');
    const userId = this.route.snapshot.queryParamMap.get('userId');

    if (token && userId) {
      this.confirmEmail(token, userId);
    } else {
      // Keine gültigen Parameter - zeige Fehler
      // Dies wird automatisch vom Alert Effect behandelt
      this.router.navigate(['/']);
    }
  }

  confirmEmail(token: string, userId: string) {
    this.isProcessing = true;

    const ConfirmRegistrationDto: ConfirmRegistrationDto = {
      token: token,
      userId: userId,
      pylon: ''  // Wird im Service gesetzt
    };

    // Dispatch Action - das war's!
    // Die gesamte Error-Behandlung läuft über:
    // 1. Auth Effects (catchError)
    // 2. Alert Effects (Notification)
    this.store.dispatch(
      AuthActions.confirmRegistration({ ConfirmRegistrationDto })
    );

    // Optional: Subscribe auf Success-Action um UI zu aktualisieren
    // Oder verwende Selectors für reactive UI
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}

/**
 * Mögliche API Responses und wie sie behandelt werden:
 * 
 * 1. Success (200 OK):
 *    → confirmRegistrationSuccess Action
 *    → Alert Effect zeigt: "Ihre Registrierung wurde erfolgreich bestätigt."
 *    → isConfirmed = true
 * 
 * 2. Error (400 Bad Request) mit code: 10:
 *    → confirmRegistrationFailure Action
 *    → Alert Effect erkennt code: 10
 *    → Zeigt: "E-Mail wurde bereits bestätigt. Sie können sich direkt anmelden."
 *    → Severity: 'info' (nicht 'error')
 * 
 * 3. Error (400 Bad Request) mit code: 11:
 *    → confirmRegistrationFailure Action
 *    → Alert Effect erkennt code: 11
 *    → Zeigt: "Ungültiger Bestätigungslink. Bitte fordern Sie einen neuen an."
 *    → Severity: 'error'
 * 
 * 4. Error (400 Bad Request) mit code: 12:
 *    → confirmRegistrationFailure Action
 *    → Alert Effect erkennt code: 12
 *    → Zeigt: "Der Bestätigungslink ist abgelaufen. Bitte fordern Sie einen neuen an."
 *    → Severity: 'error'
 * 
 * 5. Network Error (status: 0):
 *    → HTTP Error Interceptor loggt den Fehler
 *    → confirmRegistrationFailure Action
 *    → Alert Effect zeigt: "Keine Verbindung zum Server. Bitte überprüfen Sie Ihre Internetverbindung."
 *    → Severity: 'error'
 * 
 * 6. Server Error (500):
 *    → HTTP Error Interceptor loggt den Fehler
 *    → confirmRegistrationFailure Action
 *    → Alert Effect zeigt: "Serverfehler. Bitte versuchen Sie es später erneut.\n\nWenn das Problem bestehen bleibt, wenden Sie sich bitte an unseren Support."
 *    → Severity: 'error'
 */
