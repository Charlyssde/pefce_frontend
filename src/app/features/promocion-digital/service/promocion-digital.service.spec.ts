import { TestBed } from '@angular/core/testing';

import { PromocionDigitalService } from './promocion-digital.service';

describe('PromocionDigitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromocionDigitalService = TestBed.get(PromocionDigitalService);
    expect(service).toBeTruthy();
  });
});
