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
    downloadIndex: 0,
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
    downloadIndex: 1,
    title: 'Donald John Trump mit Vorfahren',
    text: 'Eine Abbildung der Familie Donald John Trump mit Vorfahren in einem Stammbaum-ähnlichen Format.',
    width: 4400,
    height: 1800
  },
  {
    imageUrl: '/example-images/Donald John Trump mit Ehefrauen, Kindern und Enkeln.png',
    imageAlt: 'Donald John Trump mit Ehefrauen, Kindern und Enkeln',
    downloadIndex: 2,
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

// Daten
// Funktionen
export const PersonenBeziehungen: ProdData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Personen anlegen und bearbeiten',
    title: 'Personen anlegen und bearbeiten',
    text: 'Personen werden zentral erfasst und können jederzeit bearbeitet oder ergänzt werden. Änderungen wirken sich konsistent auf alle zugehörigen Beziehungen im Genogramm aus.',
    // Personen werden zentral erfasst und können über den gesamten Bearbeitungszeitraum hinweg ergänzt, korrigiert und erweitert werden – auch dann, wenn neue Erkenntnisse hinzukommen.
    tags: [],
    children: [
      {
        imageUrl: '/not-found/grit-sucht.jpg',
        imageAlt: 'Personen 1',
        title: 'Personen 1',
        text: 'Beziehungen lassen sich frei zwischen Personen anlegen und bei Bedarf ändern oder neu zuordnen, ohne bestehende Strukturen aufzulösen.'
      },
      {
        imageUrl: '/not-found/grit-sucht.jpg',
        imageAlt: 'Personen 2',
        title: 'Personen 2',
        text: 'Beziehungen lassen sich frei zwischen Personen anlegen und bei Bedarf ändern oder neu zuordnen, ohne bestehende Strukturen aufzulösen.'
      },
    ]

  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Personen anlegen und bearbeiten',
    title: 'Flexible Zuordnung von Beziehungen',
    text: 'Beziehungen lassen sich frei zwischen Personen anlegen und bei Bedarf ändern oder neu zuordnen, ohne bestehende Strukturen aufzulösen.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Mehrfachbeziehungen und komplexe Konstellationen',
    title: 'Mehrfachbeziehungen und komplexe Konstellationen',
    text: 'Auch mehrfache Partnerschaften, Trennungen oder parallele Beziehungen können eindeutig und nachvollziehbar dargestellt werden.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Nachträgliche Änderungen ohne Neuzeichnen',
    title: 'Nachträgliche Änderungen ohne Neuzeichnen',
    text: 'Anpassungen an Personen oder Beziehungen erfordern kein erneutes Zeichnen des gesamten Genogramms und bleiben dauerhaft pflegbar.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Zentrale Pflege von Personendaten über mehrere Bearbeitungsschritte hinweg',
    title: 'Zentrale Pflege von Personendaten über mehrere Bearbeitungsschritte hinweg',
    text: '',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Nachvollziehbare Änderungen auch bei fortlaufender Forschung',
    title: 'Nachvollziehbare Änderungen auch bei fortlaufender Forschung',
    text: '',
    tags: []
  }
]

export const SymboleBeziehungstypen: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Vordefinierte Symbole für Personen',
    title: 'Vordefinierte Symbole für Personen',
    text: 'Für die Darstellung von Personen stehen speziell entwickelte Symbole zur Verfügung, die eine einheitliche und klare Visualisierung ermöglichen.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Unterschiedliche Beziehungstypen',
    title: 'Unterschiedliche Beziehungstypen',
    text: 'Verschiedene Beziehungstypen lassen sich eindeutig abbilden und visuell voneinander unterscheiden.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Klare visuelle Unterscheidung',
    title: 'Klare visuelle Unterscheidung',
    text: 'Symbole, Linien und Darstellungen sind so gestaltet, dass Beziehungen auch in komplexen Genogrammen gut erkennbar bleiben.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Einheitliche Darstellung im gesamten Genogramm',
    title: 'Einheitliche Darstellung im gesamten Genogramm',
    text: 'Alle verwendeten Symbole und Beziehungstypen folgen einem konsistenten Darstellungsprinzip über das gesamte Genogramm hinweg.',
    tags: []
  },
]

export const BearbeitenAnpassen: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Verschieben und Anpassen einzelner Elemente',
    title: 'Verschieben und Anpassen einzelner Elemente',
    text: 'Personen, Symbole und Beziehungen können flexibel positioniert werden, ohne die Gesamtstruktur zu beeinträchtigen.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Nachträgliche Ergänzungen',
    title: 'Nachträgliche Ergänzungen',
    text: 'Personen, Symbole und Beziehungen können nachträglich ergänzt werden, ohne die bestehende Struktur zu verändern.',
    // Neue Personen oder Beziehungen lassen sich jederzeit hinzufügen – auch bei bereits umfangreichen Genogrammen.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Iteratives Arbeiten über längere Zeiträume',
    title: 'Iteratives Arbeiten über längere Zeiträume',
    text: 'Genogramme können schrittweise erweitert und angepasst werden, etwa im Verlauf von Forschung, Beratung oder Dokumentation.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Keine starren Strukturen',
    title: 'Keine starren Strukturen',
    text: 'Die Darstellung ist nicht an feste Raster oder Vorgaben gebunden und bleibt flexibel anpassbar.',
    tags: []
  },
]

export const ArbeitenMitGrossenGenogrammen: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Darstellung vieler Generationen',
    title: 'Darstellung vieler Generationen',
    text: 'Auch umfangreiche Stammbäume mit vielen Generationen lassen sich übersichtlich und strukturiert darstellen.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Klare Struktur auch bei umfangreichen Daten',
    title: 'Klare Struktur auch bei umfangreichen Daten',
    text: 'Trotz vieler Personen und Beziehungen bleibt die Darstellung nachvollziehbar und gut lesbar.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Geeignet für genealogische Forschung',
    title: 'Geeignet für genealogische Forschung',
    text: 'Die Software unterstützt die langfristige Arbeit an komplexen Familienstrukturen, wie sie in der genealogischen Forschung üblich ist.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Langfristige Pflege großer Genogramme',
    title: 'Langfristige Pflege großer Genogramme',
    text: 'Genogramme können über lange Zeiträume hinweg gepflegt und erweitert werden, ohne an Übersichtlichkeit zu verlieren.',
    tags: []
  },
]

export const UebersichtStruktur: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Intuitive Bedienung',
    title: 'Intuitive Bedienung',
    text: 'Die Benutzeroberfläche ist so gestaltet, dass grundlegende Funktionen schnell gefunden und genutzt werden können.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Klare Menüstruktur',
    title: 'Klare Menüstruktur',
    text: 'Funktionen sind logisch gruppiert und übersichtlich angeordnet, wodurch sich der Arbeitsfluss nicht unnötig unterbricht.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Geringe Einarbeitungszeit',
    title: 'Geringe Einarbeitungszeit',
    text: 'Auch ohne technische Vorkenntnisse ist ein schneller Einstieg in die Arbeit mit dem Genogramm Designer möglich.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Fokus auf Inhalte statt Technik',
    title: 'Fokus auf Inhalte statt Technik',
    text: 'Die Software unterstützt die inhaltliche Arbeit mit Familienstrukturen, ohne den Nutzer mit technischen Details zu belasten.',
    tags: []
  },
]

// Darstellung & Ausgabe
export const DarstellungLayout: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Flexible Anordnung der Elemente',
    title: 'Flexible Anordnung der Elemente',
    text: 'Personen, Beziehungen und Symbole lassen sich frei anordnen und anpassen, um eine übersichtliche und gut lesbare Darstellung zu erreichen.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Übersichtliche Darstellung komplexer Strukturen',
    title: 'Übersichtliche Darstellung komplexer Strukturen',
    text: 'Auch bei vielen Personen und Beziehungen bleibt die visuelle Struktur klar und nachvollziehbar.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Anpassung an unterschiedliche Darstellungsgrößen',
    title: 'Anpassung an unterschiedliche Darstellungsgrößen',
    text: 'Die Darstellung passt sich flexibel an verschiedene Bildschirmgrößen und Druckformate an.',
    // Die Darstellung kann an verschiedene Arbeits- und Ausgabeformate angepasst werden, etwa für Bildschirm oder Druck.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Klare Ausrichtung und Lesbarkeit',
    title: 'Klare Ausrichtung und Lesbarkeit',
    text: 'Abstände, Linienführung und Anordnung unterstützen eine gut lesbare und strukturierte Gesamtansicht.',
    tags: []
  },
]

export const FarbenTexteHervorhebungen: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Individuelle Farbgestaltung',
    title: 'Individuelle Farbgestaltung',
    text: 'Farben können gezielt eingesetzt werden, um Generationen, Gruppen oder besondere Beziehungen hervorzuheben.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Anpassung von Texten und Beschriftungen',
    title: 'Anpassung von Texten und Beschriftungen',
    text: 'Texte und Beschriftungen können individuell angepasst werden, um die Lesbarkeit und Verständlichkeit zu verbessern.',
    // Namen und Zusatzinformationen lassen sich flexibel bearbeiten und übersichtlich platzieren.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Gezielte Hervorhebungen',
    title: 'Gezielte Hervorhebungen',
    text: 'Bestimmte Elemente können durch Farbe oder Schriftstil hervorgehoben werden, um Aufmerksamkeit zu lenken.',
    // Einzelne Personen oder Beziehungen können visuell hervorgehoben werden, ohne die Darstellung zu überladen.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Einheitliches Erscheinungsbild',
    title: 'Einheitliches Erscheinungsbild',
    text: 'Farb- und Texteinstellungen folgen einem konsistenten Gestaltungsprinzip im gesamten Genogramm.',
    tags: []
  },
]

export const BilderEinbinden: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Einbindung von Bildern',
    title: 'Einbindung von Bildern',
    text: 'Bilder können in das Genogramm integriert werden, um visuelle Informationen zu ergänzen.',
    // Bilder können Personen zugeordnet werden, um zusätzliche Informationen visuell darzustellen.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Unterstützung bei der Identifikation von Personen',
    title: 'Unterstützung bei der Identifikation von Personen',
    text: 'Fotos erleichtern die Orientierung und Wiedererkennung, besonders in umfangreichen Genogrammen.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Übersichtliche Integration',
    title: 'Übersichtliche Integration',
    text: 'Bilder werden so platziert, dass sie die Übersichtlichkeit des Genogramms erhalten und nicht stören.',
    // Bilder werden so eingebunden, dass sie die Struktur unterstützen und nicht beeinträchtigen.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Ergänzung zur textlichen Darstellung',
    title: 'Ergänzung zur textlichen Darstellung',
    text: 'Bilder können als visuelle Ergänzung zu Textinformationen dienen und die Verständlichkeit erhöhen.',
    // Visuelle Informationen ergänzen Namen und Daten sinnvoll, ohne diese zu ersetzen.
    tags: []
  },
]

export const Drucken: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Ausdruck großer Genogramme',
    title: 'Ausdruck großer Genogramme',
    text: 'Auch umfangreiche Genogramme lassen sich für den Ausdruck vorbereiten und ausgeben.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Anpassung an unterschiedliche Papierformate',
    title: 'Anpassung an unterschiedliche Papierformate',
    text: 'Genogramme können an verschiedene Papierformate angepasst werden, um den Ausdruck zu optimieren.',
    // Die Druckausgabe kann auf verschiedene Papiergrößen und Formate abgestimmt werden.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Klare und gut lesbare Druckergebnisse',
    title: 'Klare und gut lesbare Druckergebnisse',
    text: 'Die Darstellung bleibt auch im Ausdruck übersichtlich und gut lesbar.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Vorbereitung für professionelle Nutzung',
    title: 'Vorbereitung für professionelle Nutzung',
    text: 'Gedruckte Genogramme eignen sich für Beratung, Forschung oder Dokumentation.',
    tags: []
  },
]

export const ExportWeiterverwendung: PresentationData[] = [
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Export in gängige Formate',
    title: 'Export in gängige Formate',
    text: 'Genogramme können in verbreiteten Dateiformaten exportiert werden.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Weiterverwendung in Dokumenten und Präsentationen',
    title: 'Weiterverwendung in Dokumenten und Präsentationen',
    text: 'Exportierte Darstellungen lassen sich problemlos in Berichte oder Präsentationen integrieren.',
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Archivierung und Weitergabe',
    title: 'Archivierung und Weitergabe',
    text: 'Exportierte Genogramme können archiviert und weitergegeben werden.',
    // Genogramme können gespeichert, archiviert oder an andere weitergegeben werden.
    tags: []
  },
  {
    imageUrl: '/not-found/grit-sucht.jpg',
    imageAlt: 'Langfristige Nutzung der Ergebnisse',
    title: 'Langfristige Nutzung der Ergebnisse',
    text: 'Exportierte Dateien bleiben unabhängig vom Programm dauerhaft nutzbar.',
    tags: []
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
