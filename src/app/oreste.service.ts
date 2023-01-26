import { Injectable } from '@angular/core';
import { concat, i } from 'mathjs';
import { DataService } from './data.service';
import { Lagertechnik } from './model/Lagertechnik.interface';

@Injectable({
  providedIn: 'root',
})
export class OresteService {
  //Implement Oreste Steps
  lagertechniken: Lagertechnik[] = [];
  criteriaNames: string[] = [];
  constructor(private data: DataService) {}
  buildRankOrderMatrix(
    criteriaRank: Map<string, number>,
    alternativen: Lagertechnik[],
    kommissionierung: boolean
  ) {
    // Baue Matrix mit Alternativen und Kriterien
    let decisionMatrix: number[][] = [];
    let extractMatrix: number[][] = [];
    extractMatrix = this.buildExtractMatrix(alternativen, kommissionierung);

    for (let i = 0; i < extractMatrix[0].length; i++) {
      const d = this.getCriteriaArray(extractMatrix, i);
      //Get criteria positive or negativ
      const b = this.data.perfCriteria.filter(
        (c) => c.name === this.criteriaNames[i]
      );

      const x = this.rankCriteriaArray(d, !b[0].negative);
      console.log(x);
      decisionMatrix.push(x);
    }
    const cw = [...criteriaRank.values()];
    for (let i = 0; i < decisionMatrix.length; i++) {
      for (let j = 0; j < decisionMatrix[i].length; j++) {
        decisionMatrix[i][j] = this.calcDistance(cw[i], decisionMatrix[i][j]);
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
  buildExtractMatrix(alts: Lagertechnik[], komm: boolean) {
    let extractMatrix: number[][] = [];
    if (komm) {
      for (let i = 0; i < alts.length; i++) {
        const {
          kommissionierLeistung,
          ergonomie,
          raumnutzungsgrad,
          innovationsgrad,
          ausfallsicherheit,
          leistungsflexibilität,
          umbauflexibilität,
          skalierbarkeitKapazität,
          skalierbarkeitLeistung,
          investitionskosten,
          fehlerquote,
          personalbedarf,
        } = alts[i];

        extractMatrix.push([
          kommissionierLeistung,
          ergonomie,
          raumnutzungsgrad,
          innovationsgrad,
          ausfallsicherheit,
          leistungsflexibilität,
          umbauflexibilität,
          skalierbarkeitKapazität,
          skalierbarkeitLeistung,
          investitionskosten,
          fehlerquote,
          personalbedarf,
        ]);
      }
      this.criteriaNames = [
        'kommissionierLeistung',
        'ergonomie',
        'raumnutzungsgrad',
        'innovationsgrad',
        'ausfallsicherheit',
        'leistungsflexibilität',
        'umbauflexibilität',
        'skalierbarkeitKapazität',
        'skalierbarkeitLeistung',
        'investitionskosten',
        'fehlerquote',
        'personalbedarf',
      ];
    } else {
      for (let i = 0; i < alts.length; i++) {
        const {
          raumnutzungsgrad,
          innovationsgrad,
          ausfallsicherheit,
          leistungsflexibilität,
          umbauflexibilität,
          skalierbarkeitKapazität,
          skalierbarkeitLeistung,
          investitionskosten,
        } = alts[i];

        extractMatrix.push([
          raumnutzungsgrad,
          innovationsgrad,
          ausfallsicherheit,
          leistungsflexibilität,
          umbauflexibilität,
          skalierbarkeitKapazität,
          skalierbarkeitLeistung,
          investitionskosten,
        ]);
      }
      this.criteriaNames = [
        'raumnutzungsgrad',
        'innovationsgrad',
        'ausfallsicherheit',
        'leistungsflexibilität',
        'umbauflexibilität',
        'skalierbarkeitKapazität',
        'skalierbarkeitLeistung',
        'investitionskosten',
      ];
    }
    return extractMatrix;
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

  oreste(
    extractMatrix: number[][],
    criteriaRank: number[],
    boolArray?: boolean[]
  ) {
    let decisionMatrix: number[][] = [];
    decisionMatrix = this.calcDecisionMatrix(
      extractMatrix,
      criteriaRank,
      boolArray
    );
    console.log(decisionMatrix);
    let concatMatrix: number[] = [];
    for (let arr of decisionMatrix) {
      concatMatrix = concatMatrix.concat(arr);
    }
    concatMatrix = this.rankCriteriaArray(concatMatrix, false);
    console.log(concatMatrix);
    const map = this.getRankSum(concatMatrix, extractMatrix.length);
    console.log(map.values());
    return [...map.values()];
  }

  calcDecisionMatrix(
    extractMatrix: number[][],
    criteriaRank: number[],
    boolArray?: boolean[]
  ) {
    let decisionMatrix: number[][] = [];
    for (let i = 0; i < extractMatrix[0].length; i++) {
      const d = this.getCriteriaArray(extractMatrix, i);
      let x = [];
      if (boolArray) {
        x = this.rankCriteriaArray(d, boolArray[i]);
      } else {
        x = this.rankCriteriaArray(d, false);
      }
      console.log(x);
      decisionMatrix.push(x);
    }
    const cw = criteriaRank;
    for (let i = 0; i < decisionMatrix.length; i++) {
      for (let j = 0; j < decisionMatrix[i].length; j++) {
        decisionMatrix[i][j] = this.calcDistance(cw[i], decisionMatrix[i][j]);
      }
    }
    console.log(decisionMatrix);
    return decisionMatrix;
  }

  globalRanks(decisionMatrix: number[][], criteraCount: number) {
    let concatMatrix: number[] = [];
    for (let arr of decisionMatrix) {
      concatMatrix = concatMatrix.concat(arr);
    }
    concatMatrix = this.rankCriteriaArray(concatMatrix, false);
    // console.log(concatMatrix);
    const map = this.getRankSum(concatMatrix, criteraCount);
    console.log(concatMatrix);
    let globalMatrix: number[][] = [];
    const chunkSize = 7;
    for (let i = 0; i < concatMatrix.length; i += chunkSize) {
      const chunk = concatMatrix.slice(i, i + chunkSize);
      // do whatever
      globalMatrix.push(chunk);
    }
    console.log(globalMatrix);
    return globalMatrix;
  }
}
