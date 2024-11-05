import { TestBed } from '@angular/core/testing';

import { SubjectsApiService } from './subjects-api.service';

describe('SubjectsApiService', () => {
  let service: SubjectsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
