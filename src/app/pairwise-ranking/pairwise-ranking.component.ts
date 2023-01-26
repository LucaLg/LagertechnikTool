import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { DataService } from '../data.service';
import { Lagertechnik } from '../model/Lagertechnik.interface';
import { OresteService } from '../oreste.service';

@Component({
  selector: 'app-pairwise-ranking',
  templateUrl: './pairwise-ranking.component.html',
  styleUrls: ['./pairwise-ranking.component.css'],
})
export class PairwiseRankingComponent {
  @Input() alternativen: { name: string; lagertechnik: Lagertechnik }[] = [];
  @Output() ranked = new EventEmitter<boolean>();
  criteria: { name: string; negative: boolean }[] = [];
  scoreMap = new Map<string, number>();
  leftIndex: number = 0;
  rightIndex: number = 1;
  constructor(private dataSerivce: DataService, private oreste: OresteService) {
    if (this.dataSerivce.kommissionierung) {
      this.criteria = this.dataSerivce.perfCriteria;
    } else {
      this.criteria = this.dataSerivce.perfCriteriaWithoutKommissionierung;
    }
    for (let criteria of this.criteria) {
      this.scoreMap.set(criteria.name, 0);
    }
    console.log(this.criteria);
  }
  criteriaClicked(index: number) {
    const oldScore = this.scoreMap.get(this.criteria[index].name)!;
    this.scoreMap.set(this.criteria[index].name, oldScore + 1);

    if (this.rightIndex < this.criteria.length - 1) {
      this.rightIndex++;
    } else {
      if (this.leftIndex < this.criteria.length - 2) {
        this.leftIndex++;
        this.rightIndex = this.leftIndex + 1;
        if (this.rightIndex >= this.criteria.length - 1) {
          this.finished();
        }
      } else {
        console.log(this.scoreMap);
        // Display ranking
        let scoreArray = Array.from(this.scoreMap.values());
        scoreArray = this.oreste.rankCriteriaArray(scoreArray, true);
        let index = 0;
        this.scoreMap.forEach((value, key) => {
          this.scoreMap.set(key, scoreArray[index]);
          index++;
        });
        console.log(scoreArray);
        this.finished();
      }
    }
  }

  finished() {
    this.dataSerivce.rankingMap = this.scoreMap;
    this.ranked.next(true);
  }
}
