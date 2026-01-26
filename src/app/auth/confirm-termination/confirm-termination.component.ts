import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { Meta, Title } from '@angular/platform-browser';

import { AuthActions } from '../../_store/auth.actions';
import { SeoService } from '../../_service/seo.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmterminateMembership } from '../../_interface/auth-dto';

@Component({
    selector: 'app-confirm-termination',
    templateUrl: './confirm-termination.component.html',
    styleUrl: './confirm-termination.component.scss',
    imports: [RouterLink, MatCardModule, MatButtonModule]
})
export class ConfirmTerminationComponent implements OnInit {

  pageTitle: string = 'Kontokündigung bestätigen';
  pageUrl = '/confirm-termination';

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private seoService = inject(SeoService);
  
  private hasDispatched = false;

  constructor() { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);
    this.updateMeta();
    this.seoService.updateCanonicalUrl(this.pageUrl);

    // Verhindere mehrfache Ausführung
    if (this.hasDispatched) {
      return;
    }
    this.hasDispatched = true;

    const token = this.route.snapshot.queryParams['token'];
    const userid = this.route.snapshot.queryParams['userid'];
    
    const confirmterminateMembership: ConfirmterminateMembership = { token: token, userId: userid, pylon: '' };
    
    this.store.dispatch(AuthActions.confirmTerminateMemmbership({ confirmterminateMembership }));
  }

  updateMeta() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.meta.updateTag({ name: 'keywords', content: 'Genogramm Designer, Kündigung bestätigt' },);
    this.meta.updateTag({ name: 'description', content: 'Kündigung bestätigt' });
  }

}
