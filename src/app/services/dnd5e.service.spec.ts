import { TestBed } from '@angular/core/testing';

import { Dnd5eService } from './dnd5e.service';

describe('Dnd5eService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Dnd5eService = TestBed.get(Dnd5eService);
    expect(service).toBeTruthy();
  });
});
