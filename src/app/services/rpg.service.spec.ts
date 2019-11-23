import { TestBed } from '@angular/core/testing';

import { RpgService } from './rpg.service';

describe('RpgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RpgService = TestBed.get(RpgService);
    expect(service).toBeTruthy();
  });
});
