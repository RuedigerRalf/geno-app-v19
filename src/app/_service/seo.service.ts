import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

    private hostName="https://genogramm-designer.de"

  constructor(@Inject(DOCUMENT) private document: Document) { }

  updateCanonicalUrl(url:string){
    const head = this.document.getElementsByTagName('head')[0];
    var element = this.document.querySelector(`link[rel='canonical']`) as HTMLLinkElement | null;
    if (element == null) {
      element= this.document.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel','canonical')
    element.setAttribute('href',this.hostName+url)
  }
}
