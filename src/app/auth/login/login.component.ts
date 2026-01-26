import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Meta, Title } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';
import { AuthActions } from '../../_store/auth.actions';

import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { SeoService } from '../../_service/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterLink, MatCardModule, MatFormFieldModule, TextFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class LoginComponent implements OnInit {

  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  pageTitle = 'Genogramm Designer Login';
  pageUrl = '/login';

  private meta = inject(Meta);
  private title = inject(Title);
  private fb = inject(FormBuilder);
  private store = inject(Store)
  private seoService = inject(SeoService);

  hide = true;

  form = this.fb.group({
    email: ['', [Validators.maxLength(50), Validators.required, Validators.email]],
    password: ['', [Validators.maxLength(50), Validators.required]],
    feld: [''],
  })

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Login' },);
    this.meta.updateTag({ name: 'description', content: 'Login' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.get(control)?.hasError(error);
  };

  public loginUser = (loginFormValue: any) => {
    const _login = { ...loginFormValue };

    if (_login.feld !== '') {
      this.cleanForm();
      return
    }

    this.store.dispatch(AuthActions.loginUser({ username: _login.email, password: _login.password }));
    this.cleanForm();
  };

  public cleanForm() {
    this.form.reset();
    this.myForm.resetForm();
  };

}

