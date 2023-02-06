import { Component, EventEmitter, Output } from '@angular/core';
import { boolean, e } from 'mathjs';
import { DataService } from '../data.service';
import { Lagertechnik } from '../model/Lagertechnik.interface';

export interface EbAQuestion {
  frage: string;
  prop: string;
  antworten: {
    name: string;
    scale: number | boolean | string;
  }[];
}
@Component({
  selector: 'app-eba',
  templateUrl: './eba.component.html',
  styleUrls: ['./eba.component.css'],
})
export class EbaComponent {
  kommissionierung: boolean = false;
  @Output() alternativen = new EventEmitter<
    { name: string; lagertechnik: Lagertechnik }[]
  >();
  elimintaionByAspectQuestions: EbAQuestion[] = [
    {
      frage: 'Soll das Lager für Paletten oder Kleinteile verwendet werden?',
      antworten: [
        { name: 'Kleinteile', scale: 'Klt' },
        { name: 'Paletten', scale: 'Plt' },
        { name: 'Überspringen', scale: -1 },
      ],
      prop: 'lagerart',
    },
    {
      prop: 'automatisierung',
      frage: 'Soll das Lager automatisiert werden?',
      antworten: [
        { name: 'Ja', scale: true },
        { name: 'Nein', scale: false },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'investitionskosten',
      frage: 'Wie hoch können die maximalen Investitionskosten ausfallen?',
      antworten: [
        { name: 'Gering', scale: 1 },
        { name: 'Mittel', scale: 2 },
        { name: 'Hoch', scale: 3 },
        { name: 'Sehr Hoch', scale: 4 },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'eignungKommissionierung',
      frage: 'Soll kommissioniert werden?',
      antworten: [
        { name: 'Ja', scale: true },
        { name: 'Nein', scale: false },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'kommissionierLeistung',
      frage: 'Welche Pickleistung benötigen wird benötigt ?',
      antworten: [
        { name: 'Gering', scale: 1 },
        { name: 'Mittel', scale: 2 },
        { name: 'Hoch', scale: 3 },
        { name: 'Sehr hoch', scale: 4 },
        { name: 'Überspringen', scale: -1 },
      ],
    },

    {
      prop: 'kommisionierStrategie',

      frage: 'Das Lager sollte mit folgender Kommissionierstrategie arbeiten?',
      antworten: [
        { name: 'Picklist', scale: 'Picklist' },
        { name: 'Mobilen Datenendgeräte', scale: 'MDE' },
        { name: 'Pick by Light', scale: 'Pick by Light' },
        { name: 'Pick by Voice', scale: 'Pick by Voice' },
        { name: 'Überspringen', scale: -1 },
      ],
    },

    {
      prop: 'direktzugriff',
      frage: 'Soll Direktzugriff auf alle Lagerwaren bestehen?',
      antworten: [
        { name: 'Ja', scale: true },
        { name: 'Nein', scale: false },
        { name: 'Überspringen', scale: -1 },
      ],
    },

    {
      prop: 'fifo',
      frage:
        'Soll bei der Kommissionierung das Verfahren First-In First-Out verwendet werden?',
      antworten: [
        { name: 'Ja', scale: true },
        { name: 'Nein', scale: false },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'schutz',
      frage:
        'Soll die Lagertechnik einen integerierten Schutz (für bspw. Gefahrenstoffe etc.) besitzen?',
      antworten: [
        { name: 'Ja', scale: true },
        { name: 'Nein', scale: false },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'maxGewicht',
      frage: 'Welches maximale Gewicht pro Artikel soll unterstützt werden?',
      antworten: [
        { name: 'Bis 30 Kilogramm', scale: 30 },
        { name: 'Bis 50 Kilogramm', scale: 50 },
        { name: 'Bis 150 Kilogramm', scale: 150 },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'maxHöhe',
      frage: 'Welche maximal Höhe soll die Lagertechnik haben?',
      antworten: [
        { name: 'Bis 3 Meter', scale: 3 },
        { name: 'Bis 20 Meter', scale: 20 },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'KLMoglich',
      frage:
        'Soll die möglichkeit bestehen das Lager als Kühllager zu verwenden?',
      antworten: [
        { name: 'Ja ', scale: true },
        { name: 'Nein', scale: false },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'kühllagerEignung',
      frage: 'Besteht eine mindestanforderung an die Eignung zum Kühllager?',
      antworten: [
        { name: 'Schlecht geeignet ', scale: 1 },
        { name: 'Mittel geeignet', scale: 2 },
        { name: 'Gut geeignet', scale: 3 },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'artikelanzahl',
      frage:
        'Für welche Artikelanzahl soll die Lagertechnik am ehesten geeignet sein?',
      antworten: [
        { name: 'Geringe Artikelanzahl', scale: 1 },
        { name: 'Mittelere Artikelanzahl', scale: 2 },
        { name: 'Hohe Artikelanzahl', scale: 3 },
        { name: 'Überspringen', scale: -1 },
      ],
    },
    {
      prop: 'bestandsmenge',
      frage:
        'Für welche Bestandsmenge soll die Lagertechnik am ehesten geeignet sein?',
      antworten: [
        { name: 'Geringe Bestandsmenge', scale: 1 },
        { name: 'Mittelere Bestandsmenge', scale: 2 },
        { name: 'Hohe Bestandsmenge', scale: 3 },
        { name: 'Überspringen', scale: -1 },
      ],
    },
  ];
  semPerf: string[] = [
    'geringBestandsmenge',
    'mittelBestandsmenge',
    'hochbestandsmenge',
    'geringArtikelanzahl',
    'mittelArtikelanzahl',
    'hochArtikelanzahl',
  ];
  artikelAnzahlProps: string[] = [
    'hochArtikelanzahl',
    'mittelArtikelanzahl',
    'geringArtikelanzahl',
  ];
  questIndex = 0;
  lastIndex = -1;
  oldAlternatives: { name: string; lagertechnik: Lagertechnik }[][] = [];
  currentAnswer: { name: string; scale: string | boolean | number } = {
    name: '',
    scale: -1,
  };
  alternatives: { name: string; lagertechnik: Lagertechnik }[] = [];
  constructor(private dataService: DataService) {
    this.alternatives = dataService.alternatives;
  }

  questionAnswered(question: EbAQuestion, answer: string | boolean | number) {
    console.log(question, answer);
    let newAlts: { name: string; lagertechnik: Lagertechnik }[] = [];
    if (answer === -1) {
      this.currentAnswer = { name: '', scale: '' };
      this.oldAlternatives.push(this.alternatives);
      this.lastIndex = this.questIndex;
      this.questIndex++;
      return;
    }
    if (question.prop === 'investitionskosten') {
      this.handleInvestitionskosten(newAlts, answer);
      return;
    }
    if (question.prop === 'eignungKommissionierung') {
      this.handleKommissionierung(newAlts, answer);
      return;
    }
    if (question.prop === 'kommissionierLeistung') {
      console.log('Check kommissionierLeistung');
      newAlts = this.handleKommissionierleistung(newAlts, answer);
      return;
    }
    if (question.prop === 'maxGewicht') {
      newAlts = this.handleMaxGewicht(answer);

      return;
    }

    if (question.prop === 'maxHöhe') {
      newAlts = this.handleMaxHohe(answer);

      return;
    }
    if (question.prop === 'KLMoglich') {
      this.handleKLMoglich(newAlts, answer);
      return;
    }
    if (question.prop === 'kühllagerEignung') {
      this.handleKLEignung(newAlts, answer);
      return;
    }
    if (question.prop === 'bestandsmenge') {
      this.handleBestandsmenge(answer);

      return;
    }

    if (question.prop === 'artikelanzahl') {
      this.handleArtikelanzahl(answer);

      return;
    } else {
      for (let alt of this.alternatives) {
        if (question.prop != null) {
          const bla = Object.entries(alt.lagertechnik).filter(
            ([key, value]) => {
              if (key === question.prop && value === answer) {
                newAlts.push(alt);
              }
            }
          );
        }
      }
    }
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
  }
  handleKLEignung(
    newAlts: { name: string; lagertechnik: Lagertechnik }[],
    answer: string | boolean | number
  ) {
    for (let alt of this.alternatives) {
      const bla = Object.entries(alt.lagertechnik).filter(([key, value]) => {
        if (key === 'kühllagerEignung' && answer <= value) {
          newAlts.push(alt);
        }
      });
    }
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
  }
  handleKLMoglich(
    newAlts: { name: string; lagertechnik: Lagertechnik }[],
    answer: string | boolean | number
  ) {
    if (!answer) {
      this.lastIndex = this.questIndex;
      this.questIndex += 2;
      this.currentAnswer = { name: '', scale: '' };
      this.oldAlternatives.push(this.alternatives);

      return;
    }
    for (let alt of this.alternatives) {
      const bla = Object.entries(alt.lagertechnik).filter(([key, value]) => {
        if (key === 'kühllagerEignung' && answer == true && value > 0) {
          newAlts.push(alt);
        }
      });
    }
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
  }
  handleKommissionierung(
    newAlts: { name: string; lagertechnik: Lagertechnik }[],
    answer: string | boolean | number
  ) {
    this.dataService.kommissionierung = answer as boolean;
    this.oldAlternatives.push(this.alternatives);
    newAlts = this.alternatives;

    this.currentAnswer = { name: '', scale: '' };
    this.lastIndex = this.questIndex;
    if (!this.dataService.kommissionierung) {
      this.questIndex += 6;
    } else {
      this.questIndex++;
    }
  }
  handleKommissionierleistung(
    newAlts: { name: string; lagertechnik: Lagertechnik }[],
    answer: string | boolean | number
  ) {
    if (answer === 1) {
      newAlts = this.alternatives;
    } else {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.kommissionierLeistung >= answer
      );

      console.log(newAlts);
    }
    console.log('Halllloooooo');
    console.log(newAlts);
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
    return newAlts;
  }
  handleInvestitionskosten(
    newAlts: { name: string; lagertechnik: Lagertechnik }[],
    answer: string | boolean | number
  ) {
    if (answer === 4) {
      newAlts = this.alternatives;
    } else {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.investitionskosten <= answer
      );

      console.log(newAlts);
    }
    console.log('Halllloooooo');
    console.log(newAlts);
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
    return newAlts;
  }
  handleMaxGewicht(answer: string | boolean | number) {
    let newAlts: { name: string; lagertechnik: Lagertechnik }[] = [];
    for (let alt of this.alternatives) {
      const bla = Object.entries(alt.lagertechnik).filter(([key, value]) => {
        if (key === 'maxGewicht' && value >= answer) {
          newAlts.push(alt);
        }
      });
    }
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
    return newAlts;
  }
  handleMaxHohe(answer: string | boolean | number) {
    let newAlts: { name: string; lagertechnik: Lagertechnik }[] = [];
    for (let alt of this.alternatives) {
      const bla = Object.entries(alt.lagertechnik).filter(([key, value]) => {
        if (key === 'maxHöhe' && value <= answer) {
          newAlts.push(alt);
        }
      });
    }
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.questIndex++;
    return newAlts;
  }

  // handleSemPerf(prop: string, answer: string | boolean | number) {
  //   let newAlts: { name: string; lagertechnik: Lagertechnik }[] = [];
  //   console.log(this.alternatives);
  //   for (let alt of this.alternatives) {
  //     Object.entries(alt.lagertechnik).filter(([key, value]) => {
  //       if (prop === key && answer === 1) {
  //         console.log(alt);
  //         console.log(answer + ' ' + value);
  //         newAlts.push(alt);
  //       }
  //       if (prop === key && answer === 2 && (value === 2 || value === 3)) {
  //         console.log(alt);
  //         console.log(answer + ' ' + value);
  //         newAlts.push(alt);
  //       }
  //       if (prop === key && answer === 3 && value === 3) {
  //         console.log(alt);
  //         console.log(answer + ' ' + value);
  //         newAlts.push(alt);
  //       }
  //     });
  //   }
  //   console.log(newAlts);
  //   this.currentAnswer = { name: '', scale: '' };
  //   this.oldAlternatives.push(this.alternatives);
  //   this.alternatives = newAlts;
  //   this.lastIndex = this.questIndex;
  //   this.questIndex++;
  //   return newAlts;
  // }
  handleArtikelanzahl(answer: string | boolean | number) {
    let newAlts: { name: string; lagertechnik: Lagertechnik }[] = [];
    if (answer === 1) {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.geringArtikelanzahl != 1
      );
    }
    if (answer === 2) {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.mittelArtikelanzahl != 1
      );
    }
    if (answer === 3) {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.hochArtikelanzahl != 1
      );
    }
    console.log(newAlts);
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
    return newAlts;
  }
  handleBestandsmenge(answer: string | boolean | number) {
    let newAlts: { name: string; lagertechnik: Lagertechnik }[] = [];
    if (answer === 1) {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.geringBestandsmenge != 1
      );
    }
    if (answer === 2) {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.mittelBestandsmenge != 1
      );
    }
    if (answer === 3) {
      newAlts = this.alternatives.filter(
        (alt) => alt.lagertechnik.hochbestandsmenge != 1
      );
    }
    console.log(newAlts);
    this.currentAnswer = { name: '', scale: '' };
    this.oldAlternatives.push(this.alternatives);
    this.alternatives = newAlts;
    this.lastIndex = this.questIndex;
    this.questIndex++;
    return newAlts;
  }
  selectAnswer(answer: { name: string; scale: string | boolean | number }) {
    if (this.currentAnswer === answer) {
      this.currentAnswer = { name: '', scale: '' };
    } else {
      this.currentAnswer = answer;
    }
  }

  back() {
    console.log(this.oldAlternatives);
    if (this.questIndex >= 1) {
      this.questIndex = this.lastIndex;
      this.lastIndex = this.questIndex - 1;
      this.alternatives = this.oldAlternatives[this.questIndex];
      this.oldAlternatives.slice(this.questIndex, 1);
    }
    if (this.questIndex === 0) {
      this.oldAlternatives = [];
    }
  }

  next() {
    this.alternativen.next(this.alternatives);
  }
}
