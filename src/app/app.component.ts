import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Lagertechnik } from './model/Lagertechnik.interface';
import { OresteService } from './oreste.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'LagertechnikTool';
  kriterien: string[] = [];
  criteriaWeightMap = new Map<string, number>();
  lagertechniken: Lagertechnik[] = [];
  resMap = new Map<string, number>();
  resSorted = new Map<string, number>();
  ranked: boolean = false;
  ranks: number[] = [];
  result: { name: string; score: number; rank: number }[] = [];
  constructor(private oresteService: OresteService) {
    const fachbodenRegalPicklist: Lagertechnik = {
      name: 'Fachbodenregal mit Picklist',
      lagerart: false,
      automatisierung: false,
      eignungKommissionierung: true,
      fifo: true,
      direktzugriff: true,
      schutz: false,

      maxGewicht: 50,
      maxHöhe: 3,
      kühllagerEignung: 2,

      hochArtikelanzahl: 3,
      mittelArtikelanzahl: 2,
      geringArtikelanzahl: 1,
      hochbestandsmenge: 1,
      mittelBestandsmenge: 2,
      geringBestandsmenge: 3,

      investitionskosten: 1,
      kommissionierLeistung: 1,
      personalbedarf: 3,
      raumnutzungsgrad: 1,
      innovationsgrad: 1,
      ausfallsicherheit: 4,
      leistungsflexibilität: 2,
      umbauflexibilität: 2,
      skalierbarkeitLeistung: 3,
      skalierbarkeitKapazität: 3,
      ergonomie: 1,
      fehlerquote: 4,
    };
    const fachbodenRegalVertikal: Lagertechnik = {
      name: 'Fachbodenregal mit Vertikallift',
      automatisierung: false,
      investitionskosten: 2,
      eignungKommissionierung: true,
      kommissionierLeistung: 1,
      fifo: true,
      direktzugriff: true,
      personalbedarf: 3,
      ergonomie: 2,
      fehlerquote: 2,
      schutz: false,
      kühllagerEignung: 2,
      maxGewicht: 50,
      hochArtikelanzahl: 3,
      mittelArtikelanzahl: 3,
      geringArtikelanzahl: 1,
      hochbestandsmenge: 1,
      mittelBestandsmenge: 2,
      geringBestandsmenge: 3,
      maxHöhe: 20,
      raumnutzungsgrad: 2,
      innovationsgrad: 1,
      ausfallsicherheit: 3,
      leistungsflexibilität: 3,
      umbauflexibilität: 2,
      skalierbarkeitKapazität: 2,
      skalierbarkeitLeistung: 2,
      lagerart: false,
    };
    const durchLaufregal: Lagertechnik = {
      name: 'Durchlaufregal',
      automatisierung: false,
      investitionskosten: 2,
      eignungKommissionierung: true,
      kommissionierLeistung: 1,
      fifo: true,
      direktzugriff: true,
      personalbedarf: 3,
      ergonomie: 2,
      fehlerquote: 2,
      schutz: false,
      kühllagerEignung: 2,
      maxGewicht: 50,
      hochArtikelanzahl: 3,
      mittelArtikelanzahl: 3,
      geringArtikelanzahl: 1,
      hochbestandsmenge: 1,
      mittelBestandsmenge: 2,
      geringBestandsmenge: 3,
      maxHöhe: 20,
      raumnutzungsgrad: 2,
      innovationsgrad: 1,
      ausfallsicherheit: 3,
      leistungsflexibilität: 3,
      umbauflexibilität: 2,
      skalierbarkeitKapazität: 2,
      skalierbarkeitLeistung: 2,
      lagerart: false,
    };
    const verschiebeRegal: Lagertechnik = {
      name: 'Verschieberegal',
      lagerart: false,
      automatisierung: false,
      eignungKommissionierung: false,
      fifo: false,
      direktzugriff: false,
      schutz: false,
      maxGewicht: 50,
      maxHöhe: 3,
      kühllagerEignung: 0,
      investitionskosten: 3,
      kommissionierLeistung: 3,
      ergonomie: 3,
      fehlerquote: 3,
      personalbedarf: 3,
      raumnutzungsgrad: 3,
      innovationsgrad: 3,
      ausfallsicherheit: 3,
      leistungsflexibilität: 3,
      umbauflexibilität: 3,
      skalierbarkeitLeistung: 3,
      skalierbarkeitKapazität: 3,
      hochArtikelanzahl: 3,
      mittelArtikelanzahl: 3,
      geringArtikelanzahl: 3,
      hochbestandsmenge: 3,
      mittelBestandsmenge: 3,
      geringBestandsmenge: 3,
    };
    const akl: Lagertechnik = {
      name: 'AKL',
      lagerart: false,
      automatisierung: false,
      eignungKommissionierung: false,
      fifo: false,
      direktzugriff: false,
      schutz: false,
      maxGewicht: 50,
      maxHöhe: 3,
      kühllagerEignung: 0,
      investitionskosten: 4,
      kommissionierLeistung: 3,
      ergonomie: 3,
      fehlerquote: 2,
      personalbedarf: 2,
      raumnutzungsgrad: 3,
      innovationsgrad: 3,
      ausfallsicherheit: 2,
      leistungsflexibilität: 1,
      umbauflexibilität: 3,
      skalierbarkeitLeistung: 3,
      skalierbarkeitKapazität: 3,
      hochArtikelanzahl: 3,
      mittelArtikelanzahl: 3,
      geringArtikelanzahl: 3,
      hochbestandsmenge: 3,
      mittelBestandsmenge: 3,
      geringBestandsmenge: 3,
    };
    this.kriterien = [
      'Personalbedarf',
      'Investitionskosten',
      'Ausfallsicherheit',
      'Flexibilität hinsichtlich der Leistung',
    ];
    this.lagertechniken = [
      verschiebeRegal,
      fachbodenRegalPicklist,
      akl,
      durchLaufregal,
    ];
    for (let kriterie of this.kriterien) {
      this.criteriaWeightMap.set(
        kriterie,
        this.kriterien.indexOf(kriterie) + 1
      );
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.kriterien, event.previousIndex, event.currentIndex);
    for (let alternative of this.kriterien) {
      this.criteriaWeightMap.set(
        alternative,
        this.kriterien.indexOf(alternative) + 1
      );
    }
  }
  rank() {
    this.result = [];
    const cW = [...this.criteriaWeightMap.values()];
    const val = [
      ...this.oresteService.buildRankOrderMatrix(cW, this.lagertechniken),
    ];
    for (let i = 0; i < val.length; i++) {
      this.resMap.set(this.lagertechniken[i].name, val[i]);
    }
    const arr = [...this.resMap.values()];

    this.ranks = this.oresteService.rankCriteriaArray(arr, false);
    const keys = [...this.resMap.keys()];
    for (let i = 0; i < keys.length; i++) {
      this.result.push({
        name: keys[i],
        rank: this.ranks[i],
        score: this.resMap.get(keys[i])!,
      });
    }

    this.ranked = true;
  }
}
