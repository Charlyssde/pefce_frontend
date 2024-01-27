import { TestBed } from '@angular/core/testing';

import { MinutasService } from './minutas.service';

describe('MinutasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinutasService = TestBed.get(MinutasService);
    expect(service).toBeTruthy();
  });
});
