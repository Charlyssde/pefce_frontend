import { TestBed } from '@angular/core/testing';

import { ScriptsGlobalService } from './scripts-global.service';

describe('ScriptsGlobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScriptsGlobalService = TestBed.get(ScriptsGlobalService);
    expect(service).toBeTruthy();
  });
});
