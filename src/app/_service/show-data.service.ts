import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowDataService {

  constructor() { }
}

export interface PresentationSimple {
  type: 'simple';
  imageUrl: string;
  imageAlt: string;
  title: string;
  text: string;
  tags?: string[];

  cheildren?: PresentationSimple[]; // Optional für verschachtelte Strukturen
}

export interface PresentationGallery {
  type: 'gallery';
  items: PresentationSimple[];
}

export type PresentationData = PresentationSimple | PresentationGallery;

export interface PresentationSection {
  key: string;                 // z.B. "geschichte"
  title: string;               // z.B. "Unsere Geschichte"
  items: PresentationData[];   // simple + gallery gemischt
}

export const SectionData: PresentationSection[] = [
  {
    key: 'geschichte',
    title: 'Unsere Geschichte',
    items: [
      {
        type: 'simple',
        imageUrl: '/not-found/grit-sucht.jpg',
        imageAlt: 'Gründung',
        title: 'Die Anfänge',
        text: 'Alles begann im Jahr 2010...',
        tags: ['Start', 'Historie']
      },
      {
        type: 'gallery',
        items: [
          {
            type: 'simple',
            imageUrl: '/not-found/grit-sucht.jpg',
            imageAlt: 'Team',
            title: 'Erstes Team',
            text: 'Die ersten Mitarbeiter...',
            tags: ['Team']
          },
          {
            type: 'simple',
            imageUrl: '/not-found/grit-sucht.jpg',
            imageAlt: 'Büro',
            title: 'Erstes Büro',
            text: 'Unser erstes Büro war...',
            tags: ['Office']
          }
        ]
      }
    ]
  },

  {
    key: 'produkte',
    title: 'Unsere Produkte',
    items: [
      {
        type: 'simple',
        imageUrl: '/not-found/grit-sucht.jpg',
        imageAlt: 'Produkt A',
        title: 'Produkt A',
        text: 'Unser erstes Produkt...',
        tags: ['Produkt']
      }
    ]
  }

];

