import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommonDataService {
  constructor() { }
}

// Klassen
export class CommonDataTextValue {
  text: string = '';
  value: number = 0;
}

export class PresentationData {
  imageUrl: string = '';
  imageAlt: string = '';
  title: string = '';
  text: string = '';
  tags?: string[] = [];
}

export class ProdData {
  imageUrl: string = '';
  imageAlt: string = '';
  title: string = '';
  text: string = '';
  tags?: string[] = [];

  children?: ProdData[];
}

export class FeatureData {
  imageUrl: string = '';
  imageAlt: string = '';
  downloadIndex: number = 0;
  title: string = '';
  text: string = '';
  width: number = 0;
  height: number = 0;
}

export class ImageSliderData {
  url!: string;
  alt!: string;
}

export const getImageSliderDataMustermann: ImageSliderData[] = [
  { url: '/mustermann/1953_Mustermann.png', alt: 'Familie Mustermann im Jahr 1953' },
  
  { url: '/mustermann/1958_Mustermann.png', alt: 'Familie Mustermann im Jahr 1958' },
  { url: '/mustermann/1958_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 1958' },
  { url: '/mustermann/1958_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 1958' },
  
  { url: '/mustermann/1963_Mustermann.png', alt: 'Familie Mustermann im Jahr 1963' },
  { url: '/mustermann/1963_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 1963' },
  { url: '/mustermann/1963_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 1963' },

  { url: '/mustermann/1973_Mustermann.png', alt: 'Familie Mustermann im Jahr 1973' },
  { url: '/mustermann/1973_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 1973' },
  { url: '/mustermann/1973_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 1973' },

  { url: '/mustermann/1978_Mustermann.png', alt: 'Familie Mustermann im Jahr 1978' },
  { url: '/mustermann/1978_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 1978' },
  { url: '/mustermann/1978_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 1978' },

  { url: '/mustermann/1983_Mustermann.png', alt: 'Familie Mustermann im Jahr 1983' },
  { url: '/mustermann/1983_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 1983' },
  { url: '/mustermann/1983_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 1983' },
  
  { url: '/mustermann/1988_Mustermann.png', alt: 'Familie Mustermann im Jahr 1988' },
  { url: '/mustermann/1988_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 1988' },
  { url: '/mustermann/1988_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 1988' },

  { url: '/mustermann/1993_Mustermann.png', alt: 'Familie Mustermann im Jahr 1993' },
  { url: '/mustermann/1993_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 1993' },
  { url: '/mustermann/1993_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 1993' },

  { url: '/mustermann/2003_Mustermann.png', alt: 'Familie Mustermann im Jahr 2003' },
  { url: '/mustermann/2003_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 2003' },
  { url: '/mustermann/2003_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 2003' },

  { url: '/mustermann/2013_Mustermann.png', alt: 'Familie Mustermann im Jahr 2013' },
  { url: '/mustermann/2013_Mustermann_s.png', alt: 'Familie Mustermann im Jahr 2013' },
  { url: '/mustermann/2013_Mustermann_t.png', alt: 'Familie Mustermann im Jahr 2013' },

  { url: '/mustermann/2013_Mustermann_farbe.png', alt: 'Familie Mustermann im Jahr 2013' },
  { url: '/mustermann/2013_Mustermann_farbe2.png', alt: 'Familie Mustermann im Jahr 2013' },
  { url: '/mustermann/2013_Mustermann_farbe3.png', alt: 'Familie Mustermann im Jahr 2013' },
  { url: '/mustermann/2013_Mustermann_farbe4.png', alt: 'Familie Mustermann im Jahr 2013' },
  
];

// Daten
export const BritischeMonarchenImages: FeatureData[] = [
  {
    imageUrl: '/example-images/Britische und Englische Monarchen.png',
    imageAlt: 'Britische und Englische Monarchen',
    downloadIndex: 0,
    title: 'Britische und Englische Monarchen',
    text: 'Eine Abbildung der britischen und englischen Monarchen seit 1485in einem Stammbaum-ähnlichen Format.',
    width: 2500,
    height: 3300
  }
]

export const HarryPotterImages: FeatureData[] = [
  {
    imageUrl: '/example-images/Familie Weasley.png',
    imageAlt: 'Familie Weasley',
    downloadIndex: 6,
    title: 'Familie Weasley',
    text: 'Eine Abbildung der Familie Weasley aus der Harry Potter Reihe in einem Stammbaum-ähnlichen Format.',
    width: 2200,
    height: 850
  }
]

export const DonaldTrumpImages: FeatureData[] = [
  {
    imageUrl: '/example-images/Donald John Trump mit Verwandtschaft.png',
    imageAlt: 'Donald John Trump mit Vorfahren',
    downloadIndex: 2,
    title: 'Donald John Trump mit Vorfahren',
    text: 'Eine Abbildung der Familie Donald John Trump mit Vorfahren in einem Stammbaum-ähnlichen Format.',
    width: 4400,
    height: 1800
  },
  {
    imageUrl: '/example-images/Donald John Trump mit Ehefrauen, Kindern und Enkeln.png',
    imageAlt: 'Donald John Trump mit Ehefrauen, Kindern und Enkeln',
    downloadIndex: 1,
    title: 'Donald John Trump mit Ehefrauen, Kindern und Enkeln',
    text: 'Eine Abbildung der Familie Donald John Trump mit Ehefrauen, Kindern und Enkeln in einem Stammbaum-ähnlichen Format.',
    width: 1800,
    height: 900
  },
]

export const SigmundFreudImages: FeatureData[] = [
  {
    imageUrl: '/example-images/Familie Sigmund und Martha Freud vollstaendig.png',
    imageAlt: 'Familie Sigmund und Martha Freud Gesamtfamilie',
    downloadIndex: 5,
    title: 'Familie Sigmund und Martha Freud Gesamtfamilie',
    text: 'Eine Abbildung der Familie Sigmund und Martha Freud in einem Stammbaum-ähnlichen Format.',
    width: 3800,
    height: 1700
  },
  {
    imageUrl: '/example-images/Familie Jacob und Amalie Freud vollstaendig.png',
    imageAlt: 'Familie Jacob und Amalie Freud Gesamtfamilie',
    downloadIndex: 4,
    title: 'Familie Jacob und Amalie Freud Gesamtfamilie',
    text: 'Eine Abbildung der Familie Jacob und Amalie Freud in einem Stammbaum-ähnlichen Format.',
    width: 2700,
    height: 1300
  },
  {
    imageUrl: '/example-images/Familie Jacob und Amalie Freud Kernfamilie.png',
    imageAlt: 'Familie Jacob und Amalie Freud Kernfamilie',
    downloadIndex: 3,
    title: 'Familie Jacob und Amalie Freud Kernfamilie',
    text: 'Eine Abbildung der Familie Jacob und Amalie Freud in einem Stammbaum-ähnlichen Format.',
    width: 1500,
    height: 650
  },
  {
    imageUrl: '/example-images/Familien Freud und Bernays.png',
    imageAlt: 'Familien Freud und Bernays',
    downloadIndex: 7,
    title: 'Familien Freud und Bernays',
    text: 'Eine Abbildung der Familien Freud und Bernays in einem Stammbaum-ähnlichen Format.',
    width: 1300,
    height: 900
  },
  {
    imageUrl: '/example-images/Familien Freud und Nathansohn.png',
    imageAlt: 'Familien Freud und Nathansohn',
    downloadIndex: 8,
    title: 'Familien Freud und Nathansohn',
    text: 'Eine Abbildung der Familien Freud und Nathansohn in einem Stammbaum-ähnlichen Format.',
    width: 1600,
    height: 900
  },
]

export const HeinrichImages: FeatureData[] = [
  {
    imageUrl: '/example-images/Heinrich VIII mit allen Frauen.png',
    imageAlt: 'Heinrich VIII mit allen Frauen',
    downloadIndex: 10,
    title: 'Heinrich VIII mit allen Frauen',
    text: 'Eine Abbildung der Familie Heinrich VIII mit allen Frauen in einem Stammbaum-ähnlichen Format.',
    width: 2700,
    height: 1000
  },
  {
    imageUrl: '/example-images/Heinrich VIII mit Ehefrauen und leiblichen Kindern.png',
    imageAlt: 'Heinrich VIII mit Ehefrauen und leiblichen Kindern',
    downloadIndex: 9,
    title: 'Heinrich VIII mit Ehefrauen und leiblichen Kindern',
    text: 'Eine Abbildung der Familie Heinrich VIII mit Ehefrauen und leiblichen Kindern in einem Stammbaum-ähnlichen Format.',
    width: 1700,
    height: 1000
  },
]

export const VerwandtschaftImages: FeatureData[] = [
  {
    imageUrl: '/example-images/verwandtschaftsbeziehungen nach Grad.png',
    imageAlt: 'Verwandtschaftsbeziehungen nach Grad',
    downloadIndex: 12,
    title: 'Verwandtschaftsbeziehungen nach Grad',
    text: 'Eine Abbildung der Verwandtschaftsbeziehungen nach Grad in einem Stammbaum-ähnlichen Format.',
    width: 2800,
    height: 1500
  },
  {
    imageUrl: '/example-images/Verwandtschaftsbeziehungen nach Generation.png',
    imageAlt: 'Verwandtschaftsbeziehungen nach Generation',
    downloadIndex: 11,
    title: 'Verwandtschaftsbeziehungen nach Generation',
    text: 'Eine Abbildung der Verwandtschaftsbeziehungen nach Generation in einem Stammbaum-ähnlichen Format.',
    width: 2000,
    height: 1400
  },
]

export const duration: CommonDataTextValue[] = [
  { text: 'error', value: 5000 },
  { text: 'success', value: 3000 },
  { text: 'warn', value: 4000 },
  { text: 'info', value: 3000 },
  { text: 'default', value: 2000 },
];

export const rsaPublicKey = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtxKLhZcUZwzOTeiTo/NJ
  GGhnav47XZapR7K2JUcYTAAt6R+RLaXI3AU7Qo3e0mICnE2c77v7R/g0ruTdYDc6
  +/hVfBBXsHRF7pNPIu/75xXvm/LOre8bE61Mt7csNjLdNdhZZQ2YPpqB8NHT/Mir
  yHjMggcIEk2oxpobObHJUasxW8QkR3X8Q8U3UJTq7/6yNLPoQUDI2oLaiv3focQw
  zEacq3Hy1zjoL7atO832Wa4wzGtoXf8juvOFjWnX6gh9605lNCsi3HLsr0kihNjz
  2nITmm+F2wtFRm1g1hWqzNw83NAD8gSQVH6h7aJ2tTIempOGlEkDjO+pqmYN6Vjc
  +QIDAQAB
  -----END PUBLIC KEY-----`;
