import { TestBed } from '@angular/core/testing';

import { AdministracionWebService } from './administracion-web.service';

describe('AdministracionWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministracionWebService = TestBed.get(AdministracionWebService);
    expect(service).toBeTruthy();
  });
});
