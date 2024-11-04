import { TestBed } from '@angular/core/testing';

import { FireDataBaseService } from './fire-data-base.service';

describe('FireDataBaseService', () => {
  let service: FireDataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireDataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
