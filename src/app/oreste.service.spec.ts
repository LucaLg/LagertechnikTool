import { TestBed } from '@angular/core/testing';

import { OresteService } from './oreste.service';

describe('OresteService', () => {
  let service: OresteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OresteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
