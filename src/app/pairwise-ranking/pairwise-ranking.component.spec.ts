import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EbaComponent } from '../eba/eba.component';

import { PairwiseRankingComponent } from './pairwise-ranking.component';

describe('PairwiseRankingComponent', () => {
  let component: PairwiseRankingComponent;
  let fixture: ComponentFixture<PairwiseRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PairwiseRankingComponent, EbaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PairwiseRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
