export interface Lagertechnik {
  name: string;
  //Kleinteillager oder Palettenlager Klt= false, Plt = true
  lagerart: boolean;
  automatisierung: boolean;
  eignungKommissionierung: boolean;
  fifo: boolean;
  direktzugriff: boolean;
  schutz: boolean;

  //Gewicht und Höhe jeweils mit max Eintrag
  maxGewicht: 30 | 50 | 150;
  maxHöhe: 3 | 20;

  //Kühllager Skala Nicht geeignet - Gut transfer zu nicht Geeignet= 0 - ,Schlecht =1 ,Mittel =2 ,Gut=3
  kühllagerEignung: 0 | 1 | 2 | 3;

  //positivSkalen großer = besser Gering Mittel Hoch Sehr Hoch => 1,2,3,4
  kommissionierLeistung: 1 | 2 | 3 | 4;
  ergonomie: 1 | 2 | 3 | 4;
  raumnutzungsgrad: 1 | 2 | 3 | 4;
  innovationsgrad: 1 | 2 | 3 | 4;
  ausfallsicherheit: 1 | 2 | 3 | 4;
  leistungsflexibilität: 1 | 2 | 3 | 4;
  umbauflexibilität: 1 | 2 | 3 | 4;
  skalierbarkeitLeistung: 1 | 2 | 3 | 4;
  skalierbarkeitKapazität: 1 | 2 | 3 | 4;

  //Negativ je höher desto schlechter
  investitionskosten: 1 | 2 | 3 | 4;
  fehlerquote: 1 | 2 | 3 | 4;
  personalbedarf: 1 | 2 | 3 | 4;
  // Skala Wenig Mittel Sehr Gut => 1,2,3

  hochArtikelanzahl: 1 | 2 | 3;
  mittelArtikelanzahl: 1 | 2 | 3;
  geringArtikelanzahl: 1 | 2 | 3;
  hochbestandsmenge: 1 | 2 | 3;
  mittelBestandsmenge: 1 | 2 | 3;
  geringBestandsmenge: 1 | 2 | 3;
}
