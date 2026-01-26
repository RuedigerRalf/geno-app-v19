import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { Meta, Title } from '@angular/platform-browser';
import { AuthActions } from '../../_store/auth.actions';
import { SeoService } from '../../_service/seo.service';

import { MatButtonModule } from '@angular/material/button';
import { ConfirmRegistrationDto } from '../../_interface/confirm-registration-dto';

@Component({
  selector: 'app-confirm-registration',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './confirm-registration.html',
  styleUrl: './confirm-registration.scss',
})
export class ConfirmRegistration implements OnInit {
  pageTitle: string = 'Genogramm Designer Registrierung bestätigen';
  pageUrl = '/confirm-email';

  private meta = inject(Meta);
  private title = inject(Title);
  private store = inject(Store)
  private activatedRoute = inject(ActivatedRoute)
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  
  private hasDispatched = false;

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
    this.seoService.updateCanonicalUrl(this.pageUrl);

    // Only execute in browser, not during SSR
    if (!isPlatformBrowser(this.platformId) || this.hasDispatched) {
      return;
    }
    
    this.hasDispatched = true;

    const token = this.activatedRoute.snapshot.queryParams['token'];
    const userid = this.activatedRoute.snapshot.queryParams['userid'];

    const confirmRegistrationDto: ConfirmRegistrationDto = { token: token, userId: userid, pylon: '' };

    this.store.dispatch(AuthActions.confirmRegistration({ confirmRegistrationDto }));
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Registrierung bestätigen' },);
    this.meta.updateTag({ name: 'description', content: 'Genogramm Designer Registrierung bestätigen' });
  }
   
}
