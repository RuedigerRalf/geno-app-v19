import { Component, inject, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { selectGetUserMail } from '../../_store/auth.selectors';
import { ResetEmailDto } from '../../_interface/ConfirmEmailDto';

import { EmailValidator } from '../../_validators/email-validator';
import { Meta, Title } from '@angular/platform-browser';

import { AuthActions } from '../../_store/auth.actions';

import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { SeoService } from '../../_service/seo.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrl: './reset-email.component.scss',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, TextFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule]
})
export class ResetEmailComponent {

  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  pageTitle: string = 'E-Mail ändern';
  pageUrl = '/reset-email';

  private meta = inject(Meta);
  private title = inject(Title);
  private fb = inject(FormBuilder);
  private store = inject(Store)
  private seoService = inject(SeoService);

  form = this.fb.group({
    old_mail: [''],
    email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    confirmMail: [''],
    feld: ['']
  },
    { validator: EmailValidator.emailMatchValidator } as AbstractControlOptions);

  constructor() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
  }

  ngOnInit(): void {
    let eMail;
    this.store
      .pipe(select(selectGetUserMail))
      .subscribe((mail) => (eMail = mail));

    this.form.patchValue({
      old_mail: eMail,
    });

    this.seoService.updateCanonicalUrl(this.pageUrl);
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

    const resetData: ResetEmailDto = {
      old_email: data.old_mail,
      new_email: data.email
    };

    this.store.dispatch(AuthActions.changeEmail({ resetEmailDto: resetData }));
    this.cleanForm();
  };

  cleanForm() {
    this.form.reset();
    this.myForm.resetForm();
  };

}

