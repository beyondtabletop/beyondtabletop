import { TestBed } from '@angular/core/testing';

import { HomebrewKitService } from './homebrew-kit.service';

describe('HomebrewKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomebrewKitService = TestBed.get(HomebrewKitService);
    expect(service).toBeTruthy();
  });
});
