import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { AuthActions } from '../../_store/auth.actions';
import { SeoService } from '../../_service/seo.service';
import { ConfirmNewEmailDto } from '../../_interface/auth-dto';

@Component({
  selector: 'app-confirm-new-email',
  templateUrl: './confirm-new-email.component.html',
  styleUrl: './confirm-new-email.component.scss',
  imports: [RouterLink, MatButtonModule]
})
export class ConfirmNewEmailComponent implements OnInit {

  pageTitle: string = 'Bestätigung neue E-Mail';
  pageUrl = '/confirm-new-email';

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  
  private hasDispatched = false;

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);

    // Verhindere mehrfache Ausführung
    if (this.hasDispatched) {
      console.log('[ConfirmNewEmailComponent] ngOnInit: hasDispatched=true, Abbruch');
      return;
    }
    
    this.hasDispatched = true;

    // Nur im Browser dispatchen (SSR/Hydration vermeiden)
    const isBrowser = isPlatformBrowser(this.platformId);
    console.log('[ConfirmNewEmailComponent] Plattformprüfung', { isBrowser });
    if (!isBrowser) {
      console.log('[ConfirmNewEmailComponent] SSR erkannt: Dispatch übersprungen');
      return;
    }

    const token = this.route.snapshot.queryParams['token'];
    const value = this.route.snapshot.queryParams['value'];

    console.log('[ConfirmNewEmailComponent] ngOnInit: Dispatch ConfirmNewMail', { token, value });

    // Nur dispatchen, wenn beide Parameter vorhanden sind
    if (!token || !value) {
      console.log('[ConfirmNewEmailComponent] Fehlende Query-Parameter, kein Dispatch', { token, value });
      return;
    }

    const confirmNewEmailDto: ConfirmNewEmailDto = { token: token, value: value, pylon: '' };
    this.store.dispatch(AuthActions.confirmNewMail({ confirmNewEmailDto }));
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Neue E-Mail bestätigt' },);
    this.meta.updateTag({ name: 'description', content: 'Neue E-Mail bestätigt' });

  }

}
