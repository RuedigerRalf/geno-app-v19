import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import { saveAs } from 'file-saver';

import { selectGetUserDisplayName, selectGetUserDisplayNameWithKd, selectSex, selectStatus } from '../../_store/auth.selectors';

import { UserForEdit, UserForEditResp } from '../../_interface/User';

import { KontoSchliessenComponent } from '../modal/konto-schliessen/konto-schliessen.component';
import { AuthActions } from '../../_store/auth.actions';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

import { UserService } from '../../_service/user.service';
import { NotificationService } from '../../_service/notification.service';
import { SeoService } from '../../_service/seo.service';

import { format } from "date-fns";
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-benutzer',
  templateUrl: './benutzer.component.html',
  styleUrl: './benutzer.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatCard, MatFormField, MatLabel, MatInput, MatHint, MatError,  MatButton, RouterLink]
})
export class BenutzerComponent implements OnInit {

  pageTitle: string = 'Persönliche Daten';
  pageUrl = '/benutzer/benutzer';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private userService = inject(UserService)
  private notificationService = inject(NotificationService)
  private dialog = inject(MatDialog)

  private user!: UserForEdit;
  personAlter: string = '';

  displayName: string = '';
  statusText: string = '';

  form = this.fb.group({
    firma1: ['', [Validators.maxLength(100)]],
    firma2: ['', [Validators.maxLength(100)]],
    anrede: [''],
    vorname: [''],
    nachname: [''],
    strasse: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    plz: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(20)]],
    stadt: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    staat: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    registeredOn: [''],
    email: [''],
  });

  constructor() { }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: "noindex" });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Perönliche Daten' },);
    this.meta.updateTag({ name: 'description', content: 'Persönliche Daten' });
  }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    this.seoService.updateCanonicalUrl(this.pageUrl);

    let _displayName: String = '';
    let _status: number = -1;
    let _sex: boolean = false;

    this.loadData();

    this.store
      .pipe(select(selectGetUserDisplayNameWithKd))
      .subscribe((str) => (_displayName = str));

    this.store
      .pipe(select(selectSex))
      .subscribe((str) => (_sex = str));

    this.displayName = 'Name: ' + _displayName;

    this.store
      .pipe(select(selectStatus))
      .subscribe((num) => (_status = num));
    // aktive
    // 0: Interessent,
    // 1: Kunde - Einzelplatz
    // 3: Kunde - Mehrplatz
    // 4: Kunde - Terminalserver
    // 5: Kunde - Upgrade Zahlung ausstehend,

    // 7: Kunde - Kündigung ausgesprochen,
    // 8: Kündigung bestätigt,
    // 9: Konto geschlossen

    switch (_status) {
      case 0:
        this.statusText =
          _sex == false ? 'Status: Interessentin' : 'Status: Interessent';
        break;
      case 1:
        this.statusText =
          _sex == false
            ? 'Status: Kundin - Einzelplatz'
            : 'Status: Kunde - Einzelplatz';
        break;
      case 2:
        this.statusText = _sex == false ? 'Status: Kundin' : 'Status: Kunde';
        break;
      case 3:
        this.statusText =
          _sex == false
            ? 'Status: Kundin - Mehrplatz'
            : 'Status: Kunde - Mehrplatz';
        break;
      case 4:
        this.statusText =
          _sex == false
            ? 'Status: Kundin - Terminalserver'
            : 'Status: Kunde - Terminalserver';
        break;

      case 7:
        this.statusText = 'Status: Kündigung ausgesprochen';
        break;
      case 8:
        this.statusText = 'Status: Kündigung bestätigt';
        break;
      case 9:
        this.statusText =
          _sex == false
            ? 'Status: Kundin - Konto geschlossen'
            : 'Status: Kunde - Konto geschlossen';
        break;
    }
  }

  loadData(): void {
    this.userService.getUserForEdit().subscribe({
      next: (res) => this.user = res,
      complete: () => this.onDataLoaded()
    });
  }

  onDataLoaded(): void {
    if (this.form) {
      this.form.reset();
    }

    this.form.patchValue({
      firma1: this.user.firma1,
      firma2: this.user.firma2,
      anrede: this.user.anrede,
      vorname: this.user.vorname,
      nachname: this.user.nachname,
      strasse: this.user.strasse,
      plz: this.user.plz,
      stadt: this.user.stadt,
      staat: this.user.staat,
      // registeredOn: new Date(this.user.registeredOn),
      email: this.user.email,
    });

    if (this.user.registeredOn) {
      this.form.controls['registeredOn'].setValue(format(this.user.registeredOn, 'EEEE, dd.MM.yyyy', { locale: de }));
    }
  }

  saveData(value: any): void {
    const formValues = { ...value };

    const updateData: UserForEditResp = {
      firma1: formValues.firma1,
      firma2: formValues.firma2,
      plz: formValues.plz,
      stadt: formValues.stadt,
      strasse: formValues.strasse,
      staat: formValues.staat,
    };

    this.userService
      .updateUserForEdit(updateData)
      .subscribe(() => this.onSaveComplete());
  }

  downloadDaten(): void {
    this.userService.downloadData().subscribe({
      next: (blob) => {
        let name: string;
        this.store.select(selectGetUserDisplayName).subscribe((displayName) => {
          name = displayName;
          saveAs(blob, `Persönliche Daten - ${name}.pdf`);
        });
      },
      error: (err) => this.notificationService.showNotification(
        `Fehler beim Speichern der Daten\n${err}`, 'error'
      )
    });
  }

  kontoSchliessen(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';

    const dialogRef = this.dialog.open(
      KontoSchliessenComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result == '1') {
        this.store.dispatch(AuthActions.terminateMemmbership());
      }
    });
  }

  onSaveComplete(): void {
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.get(control)?.hasError(error);
  };

}

