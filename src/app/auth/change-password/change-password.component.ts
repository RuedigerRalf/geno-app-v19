import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordDto } from '../../_interface/ChangePasswordDto';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { PasswordValidator } from '../../_validators/password-validator';

import { Meta, Title } from '@angular/platform-browser';
import { AuthActions } from '../../_store/auth.actions';
import { SeoService } from '../../_service/seo.service';

import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss',
    imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, TextFieldModule, MatInputModule, MatIconModule, MatButtonModule]
})

export class ChangePasswordComponent implements OnInit {
  @ViewChild('regForm', { static: false })
  myForm!: NgForm;

  pageTitle: string = 'Kennwort ändern';
  pageUrl = '/change-password';

  private meta = inject(Meta);
  private title = inject(Title);
  private fb = inject(FormBuilder);
  private store = inject(Store)
  private activatedRoute = inject(ActivatedRoute)
  private seoService = inject(SeoService);

  resetData!: ChangePasswordDto;

  form = this.fb.group({
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      PasswordValidator.patternValidator(/\d/, {
        hasNumber: true,
      }),
      PasswordValidator.patternValidator(/[A-Z]/, {
        hasCapitalCase: true,
      }),
      PasswordValidator.patternValidator(/[a-z]/, {
        hasSmallCase: true,
      }),
      PasswordValidator.patternValidator(
        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        {
          hasSpecialCharacters: true,
        }
      ),
    ],],
    confirmPassword: [''],
    feld: ['']
  },
    { validators: [PasswordValidator.passwordMatchValidator] } as AbstractControlOptions);

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();  
    this.seoService.updateCanonicalUrl(this.pageUrl);

    const token = this.activatedRoute.snapshot.queryParams['token'];
    const userid = this.activatedRoute.snapshot.queryParams['userid'];
    
    this.resetData = { token: token, userId: userid, password: '', pylon: '' };
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Kennwort ändern' },);
    this.meta.updateTag({ name: 'description', content: 'Kennwort ändern' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.get(control)?.hasError(error);
  };

  submitForm = (value: any) => {
    const data = { ...value };
    this.resetData.password = data.password;

    this.cleanForm();
    this.store.dispatch(AuthActions.changePassword({ changePasswordDto: this.resetData }));
  };

  public cleanForm() {
    this.form.reset();
    this.myForm.resetForm();
  };

}

