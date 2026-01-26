import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { EmailValidator } from '../../_validators/email-validator';

import { AuthActions } from '../../_store/auth.actions';
import { selectGetUserMail } from '../../_store/auth.selectors';

import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { SeoService } from '../../_service/seo.service';
import { ChangeEmailRequest } from '../../_interface/auth-dto';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrl: './reset-email.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, TextFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule]
})
export class ResetEmailComponent implements OnInit {

  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  pageTitle: string = 'E-Mail ändern';
  pageUrl = '/reset-email';

  private meta = inject(Meta);
  private title = inject(Title);
  private fb = inject(FormBuilder);
  private store = inject(Store)
  private seoService = inject(SeoService);
  private router = inject(Router);

  form = this.fb.group({
    old_mail: [''],
    email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    confirmMail: [''],
    feld: ['']
  },
    { validator: EmailValidator.emailMatchValidator } as AbstractControlOptions);

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);

    let eMail;
    this.store
      .pipe(select(selectGetUserMail))
      .subscribe((mail) => (eMail = mail));

    this.form.patchValue({
      old_mail: eMail,
    });
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, E-Mail ändern' },);
    this.meta.updateTag({ name: 'description', content: 'E-Mail ändern' });
  }

  get email() {
    return this.form.get('email');
  }
  get confirmMail() {
    return this.form.get('confirmMail');
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.get(control)?.hasError(error);
  };

  submitForm = (value: any) => {
    const data = { ...value };

    if (data.feld !== '') {
      this.cleanForm();
      return
    }

    const changeEmailRequestData: ChangeEmailRequest = {
      old_email: data.old_mail,
      new_email: data.email,
      pylon: ''
    };

    this.store.dispatch(AuthActions.changeEmail({ changeEmailRequest: changeEmailRequestData }));
    this.cleanForm();
  };

  cleanForm() {
    this.form.reset();
    this.myForm.resetForm();
  };

  onCancel(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.cleanForm();
    this.router.navigate(['/userdata/benutzer']);
  }
}


