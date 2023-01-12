import { Injectable } from '@angular/core';
import { i } from 'mathjs';
import { Lagertechnik } from './model/Lagertechnik.interface';

@Injectable({
  providedIn: 'root',
})
export class OresteService {
  //Implement Oreste Steps
  lagertechniken: Lagertechnik[] = [];
  constructor() {}

  buildRankOrderMatrix(criteriaRank: number[], alternativen: Lagertechnik[]) {
    // Baue Matrix mit Alternativen und Kriterien
    let decisionMatrix: number[][] = [];
    let extractMatrix: number[][] = [];
    for (let i = 0; i < alternativen.length; i++) {
      const {
        personalbedarf,
        investitionskosten,
        ausfallsicherheit,
        leistungsflexibilität,
      } = alternativen[i];
      extractMatrix.push([
        personalbedarf,
        investitionskosten,
        ausfallsicherheit,
        leistungsflexibilität,
      ]);
    }

    for (let i = 0; i < extractMatrix[0].length; i++) {
      const d = this.getCriteriaArray(extractMatrix, i);
      const b: boolean = i === 2 || i === 3;
      const x = this.rankCriteriaArray(d, b);
      console.log(x);
      decisionMatrix.push(x);
    }

    for (let i = 0; i < decisionMatrix.length; i++) {
      for (let j = 0; j < decisionMatrix[i].length; j++) {
        decisionMatrix[i][j] = this.calcDistance(
          criteriaRank[i],
          decisionMatrix[i][j]
        );
      }
    }
    console.log(decisionMatrix);
    let concatMatrix: number[] = [];
    for (let arr of decisionMatrix) {
      concatMatrix = concatMatrix.concat(arr);
    }
    concatMatrix = this.rankCriteriaArray(concatMatrix, false);
    console.log(concatMatrix);
    const map = this.getRankSum(concatMatrix, extractMatrix.length);
    console.log(map.values());
    return map.values();
  }

  rankCriteriaArray(rankCriteriaArray: number[], highestFirst: boolean) {
    // Create Rank Array
    let ranks = [rankCriteriaArray.length];
    if (!highestFirst) {
      for (let i = 0; i < rankCriteriaArray.length; i++) {
        let rang = 1;
        let s = 1;
        for (let j = 0; j < rankCriteriaArray.length; j++) {
          if (j != i && rankCriteriaArray[j] < rankCriteriaArray[i]) {
            rang += 1;
          }
          if (j != i && rankCriteriaArray[i] == rankCriteriaArray[j]) {
            s += 1;
          }
        }
        ranks[i] = rang + (s - 1) / 2;
      }
    } else {
      for (let i = 0; i < rankCriteriaArray.length; i++) {
        let rang = rankCriteriaArray.length;
        let s = 1;
        for (let j = 0; j < rankCriteriaArray.length; j++) {
          if (j != i && rankCriteriaArray[j] < rankCriteriaArray[i]) {
            rang -= 1;
          }
          if (j != i && rankCriteriaArray[i] == rankCriteriaArray[j]) {
            s += 1;
          }
        }
        // console.log('S:' + s + 'R:' + rang);
        ranks[i] = rang - (s - 1) / 2;
      }
    }
    return ranks;
  }
  getCriteriaArray(extractMatrix: number[][], index: number) {
    let resArray: number[] = [];
    extractMatrix.forEach((arr) => {
      resArray.push(arr[index]);
    });
    return resArray;
  }

  calcDistance(criteriaRank: number, alternativRank: number) {
    return criteriaRank / 2 + alternativRank / 2;
  }

  getRankSum(concatArr: number[], alternatives: number) {
    const altMap: Map<number, number> = new Map<number, number>();
    for (let i = 0; i < alternatives; i++) {
      altMap.set(i, 0);
    }
    for (let j = 0; j < concatArr.length; j++) {
      if (j < alternatives) {
        altMap.set(j, concatArr[j]);
      } else {
        const index = j % alternatives;
        altMap.set(index, concatArr[j] + altMap.get(index)!);
      }
    }
    return altMap;
  }
}
