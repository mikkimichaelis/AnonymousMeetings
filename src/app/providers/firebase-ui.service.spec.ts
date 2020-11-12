import { TestBed } from '@angular/core/testing';

import { FirebaseUIService } from './firebase-ui.service';

describe('FirebaseUIService', () => {
  let service: FirebaseUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
