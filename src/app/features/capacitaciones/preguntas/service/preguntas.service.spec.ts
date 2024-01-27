import { TestBed } from '@angular/core/testing';

import { PreguntasService } from './preguntas.service';

describe('PreguntasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreguntasService = TestBed.get(PreguntasService);
    expect(service).toBeTruthy();
  });
});
