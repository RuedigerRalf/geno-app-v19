import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Meta, Title } from '@angular/platform-browser';

import { AuthActions } from '../../_store/auth.actions';

import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SeoService } from '../../_service/seo.service';
import { ForgotPasswordDto } from '../../_interface/forgot-password-dto';

@Component({
  selector: 'app-forgot-password',
  imports: [MatCardModule, MatFormFieldModule, TextFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword implements OnInit {

  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  pageTitle: string = 'Kennwort zurücksetzen';
  pageUrl = '/reset-password';

  private meta = inject(Meta);
  private title = inject(Title);
  private fb = inject(FormBuilder);
  private store = inject(Store)
  private seoService = inject(SeoService);

  form = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    feld: ['']
  });

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Kennwort zurücksetzen' },);
    this.meta.updateTag({ name: 'description', content: 'Kennwort zurücksetzen' });
  }

  sendresetPassword = (resetValue: any) => {
    const reset = { ...resetValue };

    if (reset.feld !== '') {
      this.cleanForm();
      return
    }

    const forgotPasswordDto: ForgotPasswordDto = {
      email: reset.email,
      pylon: '',
    };

    this.store.dispatch(AuthActions.forgotPassword({ forgotPasswordDto }));
    this.cleanForm();
  };

  public errorHandling = (control: string, error: string) => {
    return this.form.get(control)?.hasError(error);
  };

  cleanForm() {
    this.form.reset();
    this.myForm.resetForm();
  };
}

