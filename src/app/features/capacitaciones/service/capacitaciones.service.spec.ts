import { TestBed } from '@angular/core/testing';

import { CapacitacionesService } from './capacitaciones.service';

describe('CapacitacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapacitacionesService = TestBed.get(CapacitacionesService);
    expect(service).toBeTruthy();
  });
});
