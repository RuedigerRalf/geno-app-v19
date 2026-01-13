import { Component, ViewChild, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../_service/seo.service';

import { FormBuilder, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailService } from '../../_service/mail.service';
import { NotificationService } from '../../_service/notification.service';

import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrl: './kontakt.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatCard, MatCardContent, MatFormField, MatLabel, MatInput, MatError, MatHint, MatCardActions, MatButton]
})
export class KontaktComponent {
  pageTitle = 'Kontaktformular';
  pageUrl = '/kontakt';

  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SeoService);
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);
  private mailService = inject(MailService);

  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  form = this.fb.group({
    user: ['', [Validators.required, Validators.maxLength(100)]],
    userMail: ['', [Validators.required, Validators.maxLength(100)]],
    text: ['', [Validators.required, Validators.maxLength(500)]],
    feld: ['']
  });

  constructor() {
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Kontaktformular' });
    this.meta.updateTag({ name: 'description', content: 'Kontaktformular' });
  }

  cancelEdit() {
    this.form.reset();
    this.myForm.resetForm();
  }

  saveData(value: any) {
    const _login = { ...value };

    if (_login.feld !== '') {
      this.cancelEdit();
      return
    }

    this.mailService.sendMail(value.userMail, value.user, value.text).subscribe({
      next: () => this.notificationService.showNotification(
        `Vielen Dank für Ihre Nachricht`, 'success'
      ),
      complete: () => {
        this.cancelEdit();
      }
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.get(control)?.hasError(error);
  };

}