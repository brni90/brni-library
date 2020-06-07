import { TestBed } from '@angular/core/testing';

import { BrniLibraryService } from './brni-library.service';

describe('BrniLibraryService', () => {
  let service: BrniLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrniLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
