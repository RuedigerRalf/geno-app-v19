
export class BestellungDto {
  bestelldatum: Date | undefined;
  promoCode: string | undefined;  
  rabatt: number | undefined;
  paymentType: string | undefined;
  items: Array<ProduktItem> | undefined;

  constructor() {
    new ProduktItem()
  }

}

export class ProduktItem {
  id: number | undefined;
  bezeichnung: string | undefined;
  netto: number | undefined;
  brutto: number | undefined;

  constructor() {}
}
