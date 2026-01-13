import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private apiUrl: string;
  public urlAddress: string = environment.urlAddress;

  constructor() {
    this.apiUrl = environment.urlAddress + '/api/'
  }

  getApiUrl() {
    return this.apiUrl;
  }

  getApiHost() {
    return this.apiUrl.replace('api/', '');
  }

}
