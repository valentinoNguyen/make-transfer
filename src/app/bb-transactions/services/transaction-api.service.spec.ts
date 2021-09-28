import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionApiService } from './transaction-api.service';

describe('Service: TransactionApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [TransactionApiService]
    });
  });

  it('should be created', inject([TransactionApiService], (service: TransactionApiService) => {
    expect(service).toBeTruthy();
  }));
});
