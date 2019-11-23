import { TestBed } from '@angular/core/testing';

import { BattlemapService } from './battlemap.service';

describe('BattlemapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BattlemapService = TestBed.get(BattlemapService);
    expect(service).toBeTruthy();
  });
});
