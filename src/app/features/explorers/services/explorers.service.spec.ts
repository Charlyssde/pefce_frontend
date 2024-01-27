import { TestBed } from '@angular/core/testing';

import { ExplorersService } from './explorers.service';

describe('ExplorersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExplorersService = TestBed.get(ExplorersService);
    expect(service).toBeTruthy();
  });
});
