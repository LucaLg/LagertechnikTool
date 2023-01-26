import { TestBed } from '@angular/core/testing';

import { OresteService } from './oreste.service';

fdescribe('OresteService', () => {
  let service: OresteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OresteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a ranked array', () => {
    let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let expectedArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(service.rankCriteriaArray(testArray, true)).toEqual(expectedArray);
    //create more tests
    let testArray2 = [4, 2, 1, 5, 3, 5];
    let expectedArray2 = [4, 2, 1, 5.5, 3, 5.5];
    console.log('testRun');
    expect(service.rankCriteriaArray(testArray2, false)).toEqual(
      expectedArray2
    );
  });

  it('Should rank the alternatives correcty', () => {
    let criteriaRank = [2, 1, 4.5, 3, 4.5, 7, 6];

    //  c1   7 1 2,5 2,5 6 4 5
    // c2 2 7 3 4,5 1 6 4,5
    // c3 4,5 7 4,5 6 1,5 3 1,5
    // c4 2 2 4,5 2 6,5 6,5 4,5
    // c5 1 6 3,5 3,5 7 3,5 3,5
    // c6 4,5 1 4,5 3 6,5 2 6,5
    // c7 4,5 7 1 6 2,5 2,5 4,5
    // Final Rank 169,5 190,5 147,5 172 197 173,5 175
    const extractMatrix = [
      [7, 2, 4.5, 2, 1, 4.5, 4.5],
      [1, 7, 7, 2, 6, 1, 7],
      [2.5, 3, 4.5, 4.5, 3.5, 4.5, 1.5],
      [2.5, 4.5, 6, 2, 3.5, 3, 6],
      [6, 1, 1.5, 6.5, 7, 6.5, 2.5],
      [4, 6, 3, 6.5, 3.5, 2, 2.5],
      [5, 4.5, 1.5, 4.5, 3.5, 6.5, 4.5],
    ];

    //     c1 4,5 1,5 2,25 2,25 4 3 3,5
    // c2 1,5 4 2 2,75 1 3,5 2,75
    // c3 4,5 5,75 4,5 5,25 3 3,75 3
    // c4 2,5 2,5 3,75 2,5 4,75 4,75 3,75
    // c5 2,75 5,25 4 4 5,75 4 4
    // c6 5,75 4 5,75 5 6,75 4,5 6,75
    // // c7 5,25 6,5 3,5 6 4,25 4,25 5,25
    const decisionMatrix = [
      [4.5, 1.5, 2.25, 2.25, 4, 3, 3.5],
      [1.5, 4, 2, 2.75, 1, 3.5, 2.75],
      [4.5, 5.75, 4.5, 5.25, 3, 3.75, 3],
      [2.5, 2.5, 3.75, 2.5, 4.75, 4.75, 3.75],
      [2.75, 5.25, 4, 4, 5.75, 4, 4],
      [5.75, 4, 5.75, 5, 6.75, 4.5, 6.75],
      [5.25, 6.5, 3.5, 6, 4.25, 4.25, 5.25],
    ];
    expect(service.calcDecisionMatrix(extractMatrix, criteriaRank)).toEqual(
      decisionMatrix
    );

    //Global Array
    //     c1 32,5 2,5 5,5 5,5 25 14 17
    // c2 2,5 25 4 11 1 17 11
    // c3 32,5 43,5 32,5 39,5 14 20 14
    // c4 8 8 20 8 35,5 35,5 20
    // c5 11 39,5 25 25 43,5 25 25
    // c6 43,5 25 43,5 37 48,5 32,5 48,5
    // c7 39,5 47 17 46 29,5 29,5 39,5
    const globalArray = [
      [32.5, 2.5, 32.5, 8, 11, 43.5, 39.5],
      [2.5, 25, 43.5, 8, 39.5, 25, 47],
      [5.5, 4, 32.5, 20, 25, 43.5, 17],
      [5.5, 11, 39.5, 8, 25, 37, 46],
      [25, 1, 14, 35.5, 43.5, 48.5, 29.5],
      [14, 17, 20, 35.5, 25, 32.5, 29.5],
      [17, 11, 14, 20, 25, 48.5, 39.5],
    ];
    service.globalRanks(decisionMatrix, 7);

    expect(service.oreste(extractMatrix, criteriaRank)).toEqual([
      169.5, 190.5, 147.5, 172, 197, 173.5, 175,
    ]);

    const extractMatrix2: number[][] = [
      [1, 3, 2],
      [2, 1, 3],
      [3, 2, 1],
    ];
    const criteriaRank2: number[] = [1, 2, 3];
    expect(service.oreste(extractMatrix2, criteriaRank2)).toEqual([16, 14, 15]);

    //     a1 9 9 5 124
    // a2 7 5 3 135
    // a3 12 5 7 150

    const extractMatrix3: number[][] = [
      [9, 9, 5, 124],
      [7, 5, 3, 135],
      [12, 5, 7, 150],
    ];
    const criteriaRank3: number[] = [2, 4, 3, 1];
    const boolArray: boolean[] = [false, true, true, false];
    expect(service.oreste(extractMatrix3, criteriaRank3, boolArray)).toEqual([
      22, 26.5, 29.5,
    ]);
  });
});
