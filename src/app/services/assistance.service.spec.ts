import { TestBed } from '@angular/core/testing';

import { AssistanceService } from './assistance.service';

describe('AssistanceService', () => {
  let service: AssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
