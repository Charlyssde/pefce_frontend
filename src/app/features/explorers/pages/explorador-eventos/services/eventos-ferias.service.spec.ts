import { TestBed } from '@angular/core/testing';

import { EventosFeriasService } from './eventos-ferias.service';

describe('EventosFeriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventosFeriasService = TestBed.get(EventosFeriasService);
    expect(service).toBeTruthy();
  });
});
