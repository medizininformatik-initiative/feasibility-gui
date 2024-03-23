import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FhirTerminologyService } from './fhir-terminology-service.service';

describe('FhirTerminologyService', () => {
  let service: FhirTerminologyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FhirTerminologyService],
    });
    service = TestBed.inject(FhirTerminologyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should fetch and cache ValueSet data', () => {
    const testValueSetUrl =
      'https://ontoserver.imi.uni-luebeck.de/fhir/ValueSet/$expand?url=test-value-set';
    const mockResponse = {
      expansion: {
        contains: [
          { code: 'testCode1', display: 'Test Code 1' },
          { code: 'testCode2', display: 'Test Code 2' },
        ],
      },
    };

    service.getValuesFromValueSet('test-value-set').subscribe((data: any) => {
      // Expect the service to return the mock response data
      expect(data).toEqual(mockResponse.expansion.contains);
    });

    // Expect one request with the correct method and URL
    const req = httpTestingController.expectOne(testValueSetUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock data
    req.flush(mockResponse);

    // Second subscription to test caching
    service.getValuesFromValueSet('test-value-set').subscribe((data: any) => {
      expect(data).toEqual(mockResponse.expansion.contains);
      // No additional HTTP request should be made, thanks to caching
    });

    // Confirm the request was cached by not expecting another HTTP call.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
