import { afterNextRender, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd, Scroll } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { select, Store } from '@ngrx/store';
import { SeoService } from './_service/seo.service';
import { NavItem } from './_interface/NavItem';
import { filter, map, Observable, of, shareReplay } from 'rxjs';
import { selectIsLoggedIn } from './_store/auth.selectors';
import { CookieSelection } from './_interface/Cookie';
import { CookieDialogComponent } from './_components/cookie-dialog/cookie-dialog.component';
import { FooterComponent } from './_components/footer/footer.component';
import { AuthActions } from './_store/auth.actions';

@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule, AsyncPipe, RouterLink, RouterLinkActive, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Genogramm Designer';
  pageUrl = '/';

  private store = inject(Store)
  private dialog = inject(MatDialog);
  private ssrCookieService = inject(SsrCookieService);
  private breakpointObserver = inject(BreakpointObserver);
  private seoService = inject(SeoService);
  private router = inject(Router);

  navCompany: NavItem[] = [
    { title: 'Datenschutzerklärung', route: '/gdpr', icon: 'business' },
    { title: 'Impressum', route: '/impressum', icon: 'corporate_fare' },
    { title: 'Kontakt', route: '/kontakt', icon: 'contact_mail' },
    { title: 'Bildnachweise', route: '/bildnachweise', icon: 'image' }
  ];

  navHelp2: NavItem[] = [
    { title: 'Häufig gestellte Fragen', route: '/fragen-und-antworten', icon: 'quiz' }
  ];

  navMain: NavItem[] = [
    { title: 'Home', route: '/home', icon: 'dashboard' },
    { title: 'Funktionen', route: '/funktionen', icon: 'keyboard_command_key' },
    { title: 'Darstellung & Ausgabe', route: '/darstellung', icon: 'display_settings' },
    { title: 'Lizenzierung & Preise', route: '/lizenzierung', icon: 'gavel' },   
    { title: 'Das Programm', route: '/programm', icon: 'foundation' },
    { title: 'Beispiele', route: '/beispiele', icon: 'preview' },

    { title: 'Home 2', route: '/home2', icon: 'dashboard' },
    { title: 'scrollytelling', route: '/scrollytelling', icon: 'dashboard' },
    { title: 'Workflow 1', route: '/workflow1', icon: 'dashboard' },
    { title: 'Workflow 2', route: '/workflow2', icon: 'dashboard' },
    { title: 'Workflow 3', route: '/workflow3', icon: 'dashboard' },
    // { title: 'Home 4', route: '/home4', icon: 'dashboard' },

    { title: 'Voraussetzungen', route: '/technische-voraussetzungen', icon: 'handyman' },
  ];

  navUser: NavItem[] = [
    { title: 'Benutzerbereich', route: '/userdata', icon: 'self_improvement' }
  ];

  year = new Date().getFullYear();

  IsLoggedIn$: Observable<boolean> = of(false);

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild('sidenavContent', { read: ElementRef })
  sidenavContent!: ElementRef<HTMLElement>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 1024px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.seoService.updateCanonicalUrl(this.pageUrl);
    this.store.pipe(select(selectIsLoggedIn))
      .subscribe((res) => {
        this.IsLoggedIn$ = of(res);
      });

    // Scroll to top on route change (but not on fragment navigation)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (this.sidenavContent) {
          // Only scroll to top if there's no fragment (anchor)
          if (!event.url.includes('#')) {
            this.sidenavContent.nativeElement.scrollTop = 0;
          }
        }
      });

    // Handle fragment scrolling
    this.router.events
      .pipe(filter(event => event instanceof Scroll))
      .subscribe((event: Scroll) => {
        if (event.anchor && this.sidenavContent) {
          // Wait for view to render
          setTimeout(() => {
            const element = document.getElementById(event.anchor!);
            if (element) {
              const container = this.sidenavContent.nativeElement;
              const elementTop = element.getBoundingClientRect().top;
              const containerTop = container.getBoundingClientRect().top;
              const scrollTop = container.scrollTop;
              const targetScroll = scrollTop + elementTop - containerTop - 40; // 20px offset

              // Smooth scroll animation
              container.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
          }, 200);
        }
      });
  }

  constructor() {
    afterNextRender(() => {
      this.checkCookieStorage();
    });
  }

  checkCookieStorage() {
    let cookie = this.ssrCookieService.get('necessary');

    if (!cookie) {
      this.showCookieDialog();
    }
  }

  showCookieDialog() {
    let data: CookieSelection = {
      necessary: true,
      functional: false,
      statistics: false,
      marketing: false,
    };
    const dialogRef = this.dialog.open(CookieDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe({
      next: value => this.update(value)
    });
  }

  update(val: any) {
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutUser());
  }

}
