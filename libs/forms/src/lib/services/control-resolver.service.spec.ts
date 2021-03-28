import { TestBed } from '@angular/core/testing';

import { ControlResolverService } from './control-resolver.service';

describe('ControlResolverService', () => {
  let service: ControlResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
