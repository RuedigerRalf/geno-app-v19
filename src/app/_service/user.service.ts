
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { select, Store } from '@ngrx/store';
import { selectGetUserMail } from '../_store/auth.selectors';

import { Observable, shareReplay } from 'rxjs';
import * as forge from 'node-forge';

import { rsaPublicKey } from './common-data.service';
import { UserForEdit, UserForEditResp } from '../_interface/User';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  httpClient = inject(HttpClient);
  private environmentService = inject(EnvironmentService);
  private store = inject(Store);

  baseUrl: string = '';
  destination: string = 'User';
  publicKey: string = '';

  headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor() {
    this.baseUrl = this.environmentService.getApiUrl() + this.destination;
    this.publicKey = rsaPublicKey;
  }

  private getCrudDtoFake() {
    let userMail: string = '';
    this.store
      .pipe(select(selectGetUserMail))
      .subscribe((mail) => (userMail = mail));

    let encMail = this.encryptWithPublicKey(userMail);  
    let entityId: string = '666'

    return new HttpParams().set('email', encMail).set('id', entityId);
  }

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }

  getUserForEdit() {
    let params = this.getCrudDtoFake();
    let url = `${this.baseUrl}`;
    return this.httpClient.get<UserForEdit>(url, { headers: this.headers, params: params })
      .pipe(shareReplay());
  };

  updateUserForEdit(data: UserForEditResp) {
    let params = this.getCrudDtoFake();
    let url = `${this.baseUrl}`;
    return this.httpClient.put(url, data, { headers: this.headers, params: params });
  };

  getUserDataMain() {
    let params = this.getCrudDtoFake();
    let url = `${this.baseUrl}` + '/GetUserDataMain';
    return this.httpClient.get<number[]>(url, { headers: this.headers, params: params });
  }

  downloadData(): Observable<Blob> {
    let params = this.getCrudDtoFake();
    let url = `${this.baseUrl}` + '/DownloadDaten';
    return this.httpClient.get(url, { responseType: 'blob', headers: this.headers, params: params});
  }

}
