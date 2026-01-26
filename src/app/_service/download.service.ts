import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EnvironmentService } from './environment.service';

import { rsaPublicKey } from './common-data.service';
import { Observable, mergeMap } from 'rxjs';
import { TokenUrl } from '../_interface/Token';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private _http = inject(HttpClient);
  private _envUrl = inject(EnvironmentService);

private baseUrl: string = '';
  private destination: string = 'Token';
  publicKey: string;
  public percentDone: number = 0;
  
  headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor( ) {
    this.baseUrl = this._envUrl.getApiUrl() + this.destination;
    this.publicKey = rsaPublicKey;
  }

  private getDownloadDto(num : number) {
     return new HttpParams().set('nr', num);
  }

  downloadFile(num: number): Observable<any> {
    let url = `${this.baseUrl}` + '/GetBlobToken';
    let params = this.getDownloadDto(num);

    return this._http.get<any>(url, { params: params }).pipe(
      mergeMap((response: TokenUrl) => {
        const sasToken = response.token;
        let url2 = `${sasToken}`;
        // Remove Authorization header for Azure Blob SAS token requests
        const headers = this.headers.delete('Authorization');
        return this._http.get(url2, { headers: headers, observe: 'events', reportProgress: true, responseType: 'blob'});
      })
    );
  }

  downloadFile2(num: number): Observable<any> {
    let url = `${this.baseUrl}` + '/GetImageToken';
    let params = this.getDownloadDto(num);

    return this._http.get<any>(url, { params: params }).pipe(
      mergeMap((response: TokenUrl) => {
        const sasToken = response.token;
        let url2 = `${sasToken}`;
        return this._http.get(url2, { headers: this.headers, observe: 'events', reportProgress: true, responseType: 'blob'});
      })
    );
  }
 }


