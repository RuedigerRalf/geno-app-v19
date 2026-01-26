import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';

import { PasswordValidator } from '../../_validators/password-validator';

import { RegisterDto } from '../../_interface/Register';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, TextFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, RouterLink]
})

export class RegisterComponent implements OnInit {

  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  pageTitle: string = 'Registrierung';
  pageUrl = '/register';

  private meta = inject(Meta);
  private title = inject(Title);
  private fb = inject(FormBuilder);
  private store = inject(Store)
  private seoService = inject(SeoService);

  form = this.fb.group({
    firma1: ['', [Validators.maxLength(100)]],
    firma2: ['', [Validators.maxLength(100)]],
    anrede: ['Frau', [Validators.required, Validators.maxLength(20)]],
    vorname: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    nachname: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    strasse: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    plz: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(20)]],
    stadt: ['', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    staat: ['Deutschland', [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), Validators.maxLength(50)]],
    geburtstag: [''],
    email: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      PasswordValidator.patternValidator(/\d/, { hasNumber: true }),
      PasswordValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      PasswordValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
      PasswordValidator.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true }),
    ],],
    confirmPassword: [''],
    accept: ['', Validators.requiredTrue],
    feld: ['']
  },
    { validators: [PasswordValidator.passwordMatchValidator] } as AbstractControlOptions);

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Registrierung' },);
    this.meta.updateTag({ name: 'description', content: 'Registrierung' });
  }

  public validateControl = (controlName: string) => {
    return (this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched);
  };

  public errorHandling = (control: string, error: string) => {
    return this.form.get(control)?.hasError(error);
  };

  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    if (formValues.feld !== '') {
      this.cleanForm();
      return;
    }

    let geburtstag: Date = new Date();

    geburtstag.setHours(12);

    const registerData: RegisterDto = {
      firma1: formValues.firma1,
      firma2: formValues.firma2,
      strasse: formValues.strasse,
      plz: formValues.plz,
      stadt: formValues.stadt,
      staat: formValues.staat,
      anrede: formValues.anrede,
      vorname: formValues.vorname,
      nachname: formValues.nachname,
      geburtstag: geburtstag,
      email: formValues.email,
      password: formValues.password,
      pylon: 'pylon'
    };

    this.store.dispatch(AuthActions.registerUser({ registerDto: registerData }));
    this.cleanForm();
  };

  cleanForm() {
    this.form.reset();
    this.myForm.resetForm();
  };

  cancelEdit(): void {
    this.cleanForm();
    this.store.dispatch(AuthActions.returnToHomepage());
  }

}
