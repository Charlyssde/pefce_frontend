import { TestBed } from '@angular/core/testing';

import { DspService } from './dsp.service';

describe('DspService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DspService = TestBed.get(DspService);
    expect(service).toBeTruthy();
  });
});
