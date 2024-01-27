import { TestBed } from '@angular/core/testing';

import { AuthAuthenticatedService } from './auth-authenticated.service';

describe('AuthAuthenticatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthAuthenticatedService = TestBed.get(AuthAuthenticatedService);
    expect(service).toBeTruthy();
  });
});
