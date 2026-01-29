import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarSystem {
  id: string;
  title: string;
  slogan: string;
  description: string;
  type: string;
  baseYear: string;
  dayStart: string;
  leapRule: string;
  colorClass: string; // Tailwind Border-Farbe
  bgClass: string;    // Tailwind Background-Farbe
  icon: string;       // Name oder Pfad
}

@Component({
  selector: 'app-home2',
  imports: [CommonModule],
  templateUrl: './home2.html',
  styleUrl: './home2.scss',
})
export class Home2 {

  calendars: CalendarSystem[] = [
    {
      id: 'gregorian',
      title: 'Gregorianisch',
      slogan: 'Globale Präzision',
      description: 'Unser Fenster zur Welt und der internationale Standard für Wirtschaft und Alltag.',
      type: 'Sonnenkalender',
      baseYear: '0 (Christi Geb.)',
      dayStart: 'Mitternacht',
      leapRule: '4-Jahre (Ausnahmen)',
      colorClass: 'border-blue-600',
      bgClass: 'bg-blue-50',
      icon: 'calendar_today'
    },
    {
      id: 'islamic',
      title: 'Islamisch',
      slogan: 'Dem Mondlicht folgen',
      description: 'Ein dynamischer Mondkalender, dessen Monate sanft durch die Jahreszeiten wandern.',
      type: 'Mondkalender',
      baseYear: '622 (Hidschra)',
      dayStart: 'Abendrot',
      leapRule: '11 Tage Drift/Jahr',
      colorClass: 'border-emerald-600',
      bgClass: 'bg-emerald-50',
      icon: 'calendar_view_month'
    },
    {
      id: 'hebrew',
      title: 'Hebräisch',
      slogan: 'Kunst der Balance',
      description: 'Ein hochkomplexes System, das Mondphasen und Sonnenjahr perfekt synchronisiert.',
      type: 'Lunisolar',
      baseYear: '-3761 (Schöpfung)',
      dayStart: 'Abendrot',
      leapRule: 'Schaltmonate',
      colorClass: 'border-amber-500',
      bgClass: 'bg-amber-50',
      icon: 'calendar_view_week'
    },
    {
      id: 'julian',
      title: 'Julianisch',
      slogan: 'Das Erbe Roms',
      description: 'Der ehrwürdige Vorläufer, der heute noch den Takt vieler orthodoxer Traditionen angibt.',
      type: 'Sonnenkalender',
      baseYear: '45 v. Chr.',
      dayStart: 'Mitternacht',
      leapRule: 'Alle 4 Jahre fix',
      colorClass: 'border-red-800',
      bgClass: 'bg-red-50',
      icon: 'calendar_month'
    }
  ];

}
