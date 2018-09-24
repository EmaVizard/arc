import { TestBed, inject } from '@angular/core/testing';

import { PaqueteService } from './paquete.service';

describe('PaqueteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaqueteService]
    });
  });

  it('should be created', inject([PaqueteService], (service: PaqueteService) => {
    expect(service).toBeTruthy();
  }));
});
