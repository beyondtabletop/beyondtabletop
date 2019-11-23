import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from './global-error.handler';

describe('GlobalErrorHandler', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalErrorHandler = TestBed.get(GlobalErrorHandler);
    expect(service).toBeTruthy();
  });
});
