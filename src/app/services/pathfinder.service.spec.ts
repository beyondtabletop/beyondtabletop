import { TestBed } from '@angular/core/testing';

import { PathfinderService } from './pathfinder.service';

describe('PathfinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PathfinderService = TestBed.get(PathfinderService);
    expect(service).toBeTruthy();
  });
});
