import { Component, inject } from '@angular/core';
import { ConfirmNewEmailDto } from '../../_interface/ConfirmEmailDto';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Meta, Title } from '@angular/platform-browser';
import { AuthActions } from '../../_store/auth.actions';

import { SeoService } from '../../_service/seo.service';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-new-email',
  templateUrl: './confirm-new-email.component.html',
  styleUrl: './confirm-new-email.component.scss',
  imports: [ RouterLink, MatButtonModule],
  standalone: true,
})
export class ConfirmNewEmailComponent {

  pageTitle: string = 'Bestätigung neue E-Mail';
  pageUrl = '/confirm-new-email';

  confirmNewEmailDto!: ConfirmNewEmailDto;

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private seoService = inject(SeoService);

  constructor() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const old_email = this.route.snapshot.queryParams['userid'];
    const new_email = this.route.snapshot.queryParams['newuserid'];

    this.confirmNewEmailDto = { token: token, old_email: old_email, new_email: new_email, pylon: '', };

    this.seoService.updateCanonicalUrl(this.pageUrl);

    setTimeout(() => this.confirmEmail(), 2000);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Neue E-Mail bestätigt' },);
    this.meta.updateTag({ name: 'description', content: 'Neue E-Mail bestätigt' });

  }

  confirmEmail() {
    this.store.dispatch(AuthActions.confirmNewMail({ confirmNewEmailDto: this.confirmNewEmailDto })
    );
  }
}
