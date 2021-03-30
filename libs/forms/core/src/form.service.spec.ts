import { TestBed } from '@angular/core/testing';

import { DynFormService } from './form.service';

describe('DynFormService', () => {
  let service: DynFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
