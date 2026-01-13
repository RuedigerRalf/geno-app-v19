import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Wir definieren ein Interface für unsere Schritte
interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  imageColor: string; // Nur für Demo-Zwecke (ersetzt später echte Bilder)
  imageUrl?: string;
  imageText: string;
}

@Component({
  selector: 'app-home2',
  imports: [CommonModule],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.scss',
  standalone: true
})

export class Home2Component implements AfterViewInit, OnDestroy {

  pageTitle = 'Britische und Englische Monarchen';
  pageUrl = '/beispiele/englische-monarchen';

  // Zugriff auf alle Text-Abschnitte im DOM, um zu prüfen, wann sie sichtbar sind
  @ViewChildren('stepSection') stepSections!: QueryList<ElementRef>;

  // Signal für den aktuell aktiven Schritt (Startwert 0)
  activeStepIndex = signal(0);

  // Der IntersectionObserver überwacht das Scrollen
  private observer: IntersectionObserver | null = null;

  // Unsere Daten für den Workflow
  steps: WorkflowStep[] = [
    {
      id: 0,
      title: '1. Intuitives Drag & Drop',
      description: 'Starten Sie sofort. Wählen Sie Symbole aus der Palette und ziehen Sie diese einfach auf das Arbeitsblatt. Das Raster hilft Ihnen bei der perfekten Ausrichtung.',
      imageColor: 'bg-blue-100',
      imageUrl: '/example-images/Britische und Englische Monarchen.png',
      imageText: 'SCREENSHOT: Drag & Drop Aktion'
    },
    {
      id: 1,
      title: '2. Beziehungen ziehen',
      description: 'Verbinden Sie Personen mit einem Klick. Ob Konflikt, Ehe oder Symbiose – die Linien passen sich automatisch an, wenn Sie Personen verschieben.',
      imageColor: 'bg-emerald-100',
      imageUrl: '/example-images/Familie Weasley.png',
      imageText: 'SCREENSHOT: Verbindungslinien'
    },
    {
      id: 2,
      title: '3. Details erfassen',
      description: 'Hinterlegen Sie medizinische und soziale Daten direkt im Objekt. Das Genogramm passt sich visuell an die Attribute an (z.B. Sucht-Symbole).',
      imageColor: 'bg-amber-100',
      imageUrl: '/example-images/Donald John Trump mit Verwandtschaft.png',
      imageText: 'SCREENSHOT: Eingabemaske Details'
    },
    {
      id: 3,
      title: '4. Export & Bericht',
      description: 'Fertig? Exportieren Sie Ihre Grafik als Bild oder PDF für Ihre Akten, Berichte oder Gutachten. Perfekt formatiert.',
      imageColor: 'bg-slate-200',
      imageUrl: '/example-images/Familie Sigmund und Martha Freud vollstaendig.png',
      imageText: 'SCREENSHOT: Fertiges PDF / Word'
    }
  ];

  // WICHTIG: Hier injizieren wir die Info, auf welcher Plattform wir sind
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // CHECK: Sind wir im Browser? Nur dann existiert IntersectionObserver.
    if (isPlatformBrowser(this.platformId)) {
      this.initObserver();
    }
  }

  private initObserver() {
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    // Jetzt ist es sicher, IntersectionObserver aufzurufen
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          this.activeStepIndex.set(index);
        }
      });
    }, options);

    this.stepSections.forEach(section => {
      this.observer?.observe(section.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

  // ngAfterViewInit() {
  //   // Hier richten wir den Observer ein
  //   const options = {
  //     root: null, // Viewport ist der Bezug
  //     rootMargin: '-40% 0px -40% 0px', // Trigger-Zone: Mitte des Bildschirms
  //     threshold: 0 // Sobald ein Pixel sichtbar ist (innerhalb der Margin)
  //   };

  //   this.observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         // Wir lesen die ID aus dem data-index Attribut aus (siehe HTML)
  //         const index = Number(entry.target.getAttribute('data-index'));
  //         this.activeStepIndex.set(index);
  //       }
  //     });
  //   }, options);

  //   // Wir beobachten jedes Element in der Liste
  //   this.stepSections.forEach(section => {
  //     this.observer?.observe(section.nativeElement);
  //   });
  // }

  // ngOnDestroy() {
  //   // Wichtig: Observer aufräumen, um Memory Leaks zu vermeiden
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  // }
// }