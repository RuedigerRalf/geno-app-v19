import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { select, Store } from '@ngrx/store';

import { pki } from 'node-forge';

import { rsaPublicKey } from './common-data.service';
import { RegisterDto, RegisterRspDto } from '../_interface/Register';
import { ConfirmDto, ConfirmEmailDto, ConfirmNewEmailDto, ResetEmailDto } from '../_interface/ConfirmEmailDto';
import { LoginDto, LoginRespDto } from '../_interface/Login';
import { ResetPasswordDto } from '../_interface/ResetPasswordDto';
import { ChangePasswordDto } from '../_interface/ChangePasswordDto';
import { selectGetUserMail } from '../_store/auth.selectors';

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

  getEncrytedDate() {
    let _date = new Date().getDate().toString();
    return this.encryptWithPublicKey(_date);
  }

  register(body: RegisterDto) {
    let pass: string = body.password;
    let encPassword: string = this.encryptWithPublicKey(pass);

    const registerData: RegisterDto = {
      firma1: body.firma1,
      firma2: body.firma2,
      strasse: body.strasse,
      plz: body.plz,
      stadt: body.stadt,
      staat: body.staat,
      anrede: body.anrede,
      vorname: body.vorname,
      nachname: body.nachname,
      geburtstag: body.geburtstag,
      email: body.email,
      password: encPassword,
      pylon: this.getEncrytedDate(),
    };

    let url = `${this.Anonymous}` + '/RegisterUser';
    return this.httpClient.post<RegisterRspDto>(url, registerData, {
      headers: this.headers,
    });
  }

  confirmEmail(body: ConfirmDto) {
    let _Dto: ConfirmDto = {
      token: body.token,
      userId: body.userId,
      pylon: this.getEncrytedDate(),
    };

    let url = `${this.Anonymous}` + '/ConfirmEmail';
    return this.httpClient.post(url, _Dto, { headers: this.headers });
  }
  
  login(mail: string, password: string) {
    const loginData: LoginDto = {
      email: mail,
      password: this.encryptWithPublicKey(password),
      pylon: this.getEncrytedDate(),
    };
    let url = `${this.Anonymous}` + '/Login';
    return this.httpClient.post<LoginRespDto>(url, loginData);
  }

  resetPasswordRequest(body: ResetPasswordDto) {
    const resetPasswordDto: ResetPasswordDto = {
      email: body.email,
      pylon: this.getEncrytedDate(),
    };
    let url = `${this.Anonymous}` + '/ResetPasswordRequest';
    return this.httpClient.post(url, resetPasswordDto, { headers: this.headers });
  }

  changePassword(body: ChangePasswordDto) {
    const changePasswordDto: ChangePasswordDto = {
      token: body.token,
      userId: body.userId,
      password: this.encryptWithPublicKey(body.password),
      pylon: this.getEncrytedDate(),
    };
    let url = `${this.Anonymous}` + '/ChangePassword';
    return this.httpClient.post(url, changePasswordDto);
  }

  resetEmailRequest(body: ResetEmailDto) {
    const resetEmailDto: ResetEmailDto = {
      old_email: body.old_email,
      new_email: body.new_email,
    };
    let url = `${this.NoAnonymous}` + '/ResetEmailRequest';
    return this.httpClient.post(url, resetEmailDto, { headers: this.headers });
  }

  confirmNewEmail(body: ConfirmNewEmailDto) {
    const confirmNewEmailDto: ConfirmNewEmailDto = {
      token: body.token,
      old_email: body.old_email,
      new_email: body.new_email,
      pylon: this.getEncrytedDate(),
    };
    let url = `${this.Anonymous}` + '/ConfirmNewEmail';
    return this.httpClient.post(url, confirmNewEmailDto);
  }

  terminateMembershipRequest() {
    let userMail: string = '';
    this.store
      .pipe(select(selectGetUserMail))
      .subscribe((mail) => (userMail = mail));
    const resetPasswordDto: ResetPasswordDto = {
      email: userMail,
      pylon: 'hasta la vista',
    };
    let url = `${this.NoAnonymous}` + '/TerminateMembershipRequest';
    return this.httpClient.post(url, resetPasswordDto, { headers: this.headers });
  }

  confirmterminateMembership(body: ConfirmEmailDto) {
    const confirmNewEmailDto: ConfirmEmailDto = {
      token: body.token,
      userId: body.userId,
      pylon: this.getEncrytedDate(),
    };
    let url = `${this.Anonymous}` + '/ConfirmTerminateMembership';
    return this.httpClient.post(url, confirmNewEmailDto, { headers: this.headers });
  }
  

}
