import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmDto } from '../../_interface/ConfirmEmailDto';

import { Meta, Title } from '@angular/platform-browser';
import { AuthActions } from '../../_store/auth.actions';
import { SeoService } from '../../_service/seo.service';

import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-confirm-mail',
    templateUrl: './confirm-mail.component.html',
    styleUrl: './confirm-mail.component.scss',
    imports: [ RouterLink, MatButtonModule ],
    standalone: true,
})
export class ConfirmMailComponent implements OnInit {

  pageTitle: string = 'Genogramm Designer Registrierung bestätigen';
  pageUrl = '/confirm-email';

  private meta = inject(Meta);
  private title = inject(Title);
  private store = inject(Store)
  private activatedRoute = inject(ActivatedRoute)
  private seoService = inject(SeoService);

  constructor() {     
    this.title.setTitle(this.pageTitle);
    this.updateMeta()
  }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParams['token'];
    const userid = this.activatedRoute.snapshot.queryParams['userid'];

    const confirmDto: ConfirmDto = { token: token, userId: userid, pylon: '' };
    this.confirmEmail(confirmDto);

    this.seoService.updateCanonicalUrl(this.pageUrl);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Registrierung bestätigen' },);
    this.meta.updateTag({ name: 'description', content: 'Genogramm Designer Registrierung bestätigen' });
  }

  confirmEmail(val: ConfirmDto) {
    this.store.dispatch(AuthActions.confirmRegistration({ confirmDto: val }));
  }

}
