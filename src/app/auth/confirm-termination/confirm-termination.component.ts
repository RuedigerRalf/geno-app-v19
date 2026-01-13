import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmEmailDto } from '../../_interface/ConfirmEmailDto';

import { Meta, Title } from '@angular/platform-browser';

import { AuthActions } from '../../_store/auth.actions';
import { SeoService } from '../../_service/seo.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-confirm-termination',
    templateUrl: './confirm-termination.component.html',
    styleUrl: './confirm-termination.component.scss',
    imports: [RouterLink, MatCardModule, MatButtonModule],
    standalone: true,
})
export class ConfirmTerminationComponent {

  pageTitle: string = 'Kontokündigung bestätigen';
  pageUrl = '/confirm-termination';

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private seoService = inject(SeoService);

  confirmData!: ConfirmEmailDto;

  constructor() {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();    
   }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    const userid = this.route.snapshot.queryParams['userid'];
    this.confirmData = { token: token, userId: userid, pylon: '' };

    this.seoService.updateCanonicalUrl(this.pageUrl);

    setTimeout(() => this.confirmEmail(), 2000);
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Kündigung bestätigt' },);
    this.meta.updateTag({ name: 'description', content: 'Kündigung bestätigt' });
  }

  confirmEmail() {
    this.store.dispatch(AuthActions.confirmTerminateMemmbership({ confirmTerminateMembershipDto: this.confirmData }));
  }

}
