import { TestBed } from '@angular/core/testing';

import { PaginaContenidoService } from './pagina-contenido.service';

describe('PaginaContenidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginaContenidoService = TestBed.get(PaginaContenidoService);
    expect(service).toBeTruthy();
  });
});
