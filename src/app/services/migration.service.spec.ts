import { TestBed } from '@angular/core/testing';

import { MigrationService } from './migration.service';

describe('MigrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MigrationService = TestBed.get(MigrationService);
    expect(service).toBeTruthy();
  });
});
