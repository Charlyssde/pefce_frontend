import { TestBed } from '@angular/core/testing';

import { CatalogosService } from './catalogo.service';

describe('CatalogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogosService = TestBed.get(CatalogoService);
    expect(service).toBeTruthy();
  });
});
