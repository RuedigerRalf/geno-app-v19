import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { rsaPublicKey } from './common-data.service';
import * as forge from 'node-forge';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  private _http = inject(HttpClient);
  private _envUrl = inject(EnvironmentService);

  private baseUrl: string = '';
  private destination: string = 'Auth1';
  private publicKey: string = '';

  headers = new HttpHeaders().append('Content-Type', 'application/json');

  constructor() {
    this.baseUrl = this._envUrl.getApiUrl() + this.destination;
    this.publicKey = rsaPublicKey;
  }

  private encryptHybrid(plainText: string): { encryptedData: string, encryptedKey: string, iv: string } {
    // AES-Schlüssel und IV generieren
    const key = forge.random.getBytesSync(32); // 256 Bit
    const iv = forge.random.getBytesSync(16);  // 128 Bit

    // AES-Verschlüsselung
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(plainText, 'utf8'));
    cipher.finish();
    const encryptedData = forge.util.encode64(cipher.output.getBytes());

    // AES-Key mit RSA verschlüsseln
    const rsa = forge.pki.publicKeyFromPem(this.publicKey);
    const encryptedKey = forge.util.encode64(rsa.encrypt(key, 'RSAES-PKCS1-V1_5'));

    // IV als Base64
    const ivBase64 = forge.util.encode64(iv);

    return { encryptedData, encryptedKey, iv: ivBase64 };
  }

  private encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = forge.pki.publicKeyFromPem(this.publicKey);
    const val: string = btoa(rsa.encrypt(valueToEncrypt.toString()));
    return val;
  }

  private getPylon() {
    let _date = new Date().getDate().toString();
    return this.encryptWithPublicKey(_date);
  }

  private getEncrytedDate() {
    let _date = new Date().getDate().toString();
    return this.encryptWithPublicKey(_date);
  }

  public sendMail(UserMailAdress: string, UserName: string, UserMessage: string) {
    let body = {
      "userMailAdress": this.encryptWithPublicKey(UserMailAdress),
      "userName": this.encryptWithPublicKey(UserName),
      "userMessage": this.encryptWithPublicKey(UserMessage),
      "pylon": this.getEncrytedDate()
    };

    let url = `${this.baseUrl}` + '/ContactMail';
    return this._http.post(url, body, { headers: this.headers });
  }

  public _sendMail(MailType: number, UserMailAdress: string, UserName: string, UserMessage: string) {
    // MailType:
    // 1 -> Supportanfrage
    // 2 -> Gedenktag Vorschlag
    // 3 -> Externe Kontaktanfrage

    // Nachricht verschlüsseln
    const encrypted = this.encryptHybrid(UserMessage);

    let body = {
      contactMailType: MailType,
      userMailAdress: this.encryptWithPublicKey(UserMailAdress),
      userName: this.encryptWithPublicKey(UserName),
      encryptedMessage: encrypted.encryptedData,
      encryptedKey: encrypted.encryptedKey,
      iv: encrypted.iv,
      pylon: this.getPylon()
    };

    let url = `${this.baseUrl}/extern-contact-mail`;
    return this._http.post(url, body, { headers: this.headers });
  }
}
