import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { select, Store } from '@ngrx/store';

import { pki } from 'node-forge';

import { rsaPublicKey } from './common-data.service';
import { RegisterDto, RegisterRspDto } from '../_interface/Register';
import { LoginDto, LoginRespDto } from '../_interface/Login';

import { ChangePasswordDto } from '../_interface/ChangePasswordDto';
import { selectGetUserMail } from '../_store/auth.selectors';

import { TerminateMembershipRequestDto } from '../_interface/terminate-membership-request-dto';
import { ConfirmterminateMembershipDto } from '../_interface/confirmterminate-membership-dto';
import { ConfirmRegistrationDto } from '../_interface/confirm-registration-dto';
import { ConfirmNewEmailDto } from '../_interface/confirm-new-email-dto';
import { ChangeEmailRequestDto } from '../_interface/change-email-request-dto';
import { ForgotPasswordDto } from '../_interface/forgot-password-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private environmentService = inject(EnvironmentService);
  private store = inject(Store);

  private Anonymous: string = '';
  private NoAnonymous: string = '';
  private publicKey: string = '';

  headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor() {
    this.Anonymous = this.environmentService.getApiUrl() + 'Auth1';
    this.NoAnonymous = this.environmentService.getApiUrl() + 'Auth2';
    this.publicKey = rsaPublicKey;
  }

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = pki.publicKeyFromPem(this.publicKey);
    return btoa(rsa.encrypt(valueToEncrypt.toString()));
  }

  getPylon() {
    let _date = new Date().getDate().toString();
    return this.encryptWithPublicKey(_date);
  }

  register(body: RegisterDto) {
    let pass: string = body.password;
    let encPassword: string = this.encryptWithPublicKey(pass);

    let mail: string = body.email;
    let encMail: string = this.encryptWithPublicKey(mail);

    let dto = { ...body, email: encMail, password: encPassword, pylon: this.getPylon() };

    let url = `${this.Anonymous}` + '/RegisterUser';
    return this.httpClient.post<RegisterRspDto>(url, dto, { headers: this.headers });
  }

  confirmRegistration(body: ConfirmRegistrationDto) {
    let dto = {... body, pylon: this.getPylon() };
    let url = `${this.Anonymous}` + '/ConfirmRegistration';
    return this.httpClient.post(url, dto, { headers: this.headers });
  }

  login(mail: string, password: string) {
    let dto: LoginDto = {
      email: this.encryptWithPublicKey(mail),
      password: this.encryptWithPublicKey(password),
      pylon: this.getPylon(),
    };
    
    let url = `${this.Anonymous}` + '/Login';
    return this.httpClient.post<LoginRespDto>(url, dto, { headers: this.headers });
  }

  forgotPassword(body: ForgotPasswordDto) {
    let dto = { ...body, email: this.encryptWithPublicKey(body.email), pylon: this.getPylon() };
    let url = `${this.Anonymous}` + '/ForgotPassword';
    return this.httpClient.post(url, dto, { headers: this.headers });
  }

  changePassword(body: ChangePasswordDto) {
    let dto = { ...body, password: this.encryptWithPublicKey(body.password), pylon: this.getPylon() };
    let url = `${this.Anonymous}` + '/ChangePassword';
    return this.httpClient.post(url, dto, { headers: this.headers });
  }

  confirmNewEmail(body: ConfirmNewEmailDto) {
    let dto = { ...body, pylon: this.getPylon() };
    let url = `${this.Anonymous}` + '/ConfirmNewEmail';
    // console.log('[AuthService] confirmNewEmail: Aufruf', dto, url);
    return this.httpClient.post(url, dto, { headers: this.headers });
  }

  confirmterminateMembership(body: ConfirmterminateMembershipDto) {
    let dto = {... body, pylon: this.getPylon() };
    let url = `${this.Anonymous}` + '/ConfirmTerminateMembership';
    return this.httpClient.post(url, dto, { headers: this.headers });
  }

  // 24.1.26
  resetEmailRequest(body: ChangeEmailRequestDto) {
    let dto = {... body, pylon: this.getPylon() };
    let url = `${this.NoAnonymous}` + '/ResetEmailRequest';
    // console.log('[AuthService] resetEmailRequest: Aufruf', dto, url);
    return this.httpClient.post(url, dto, { headers: this.headers });
  }

  terminateMembershipRequest() {
    let userMail: string = '';
    this.store
      .pipe(select(selectGetUserMail))
      .subscribe((mail) => (userMail = mail));

    let dto: TerminateMembershipRequestDto = {
      email: this.encryptWithPublicKey(userMail),
      pylon: 'hasta la vista',
    };
    let url = `${this.NoAnonymous}` + '/TerminateMembershipRequest';
    return this.httpClient.post(url, dto, { headers: this.headers });
  }

}
