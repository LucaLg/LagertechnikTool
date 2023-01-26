import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DataService } from './data.service';
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
  currentAlternatives: { name: string; lagertechnik: Lagertechnik }[] = [];
  altsSet: boolean = false;
  constructor(private oresteService: OresteService, private data: DataService) {
    this.kriterien = [
      'Personalbedarf',
      'Investitionskosten',
      'Ausfallsicherheit',
      'Flexibilität hinsichtlich der Leistung',
      'Flexibilität hinsichtlich des Umbaus',
      'Skalierbarkeit der Kapazität',
      'Skalierbarkeit der Leistung',
      'Fehlerquote',
      'Kommissionierleistung',
      'Ergonomie',
      'Raumnutzungsgrad',
      'Innovationsgrad',
    ];
    // this.lagertechniken = [verschiebeRegal, fachbodenRegalPicklist, akl];
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
    const cW = [...this.data.rankingMap.values()];
    const val = [
      ...this.oresteService.buildRankOrderMatrix(
        this.data.rankingMap,
        this.data.currentAlternatives,
        this.data.kommissionierung
      ),
    ];
    for (let i = 0; i < val.length; i++) {
      this.resMap.set(this.currentAlternatives[i].lagertechnik.name, val[i]);
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
  setCurrentAlternatives(
    alternatives: { name: string; lagertechnik: Lagertechnik }[]
  ) {
    this.altsSet = true;
    console.log(alternatives);
    this.data.currentAlternatives = alternatives.map((alt) => alt.lagertechnik);
    this.currentAlternatives = alternatives;
  }
  setScores() {
    this.rank();
    console.log(this.data.rankingMap);
  }
}
