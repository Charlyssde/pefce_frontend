import { TestBed } from '@angular/core/testing';

import { EnterprisesService } from './enterprises.service';

describe('EnterprisesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnterprisesService = TestBed.get(EnterprisesService);
    expect(service).toBeTruthy();
  });
});
