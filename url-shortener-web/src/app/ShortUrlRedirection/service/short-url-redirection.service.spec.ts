import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { ShortUrlRedirectionService } from './short-url-redirection.service';

describe('ShortUrlRedirectionService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ShortUrlRedirectionService;

  
  const mockResponse = [{
    "_id": "1SMCS",
    "longUrl": "http://www.google.com",
    "createdAt": "2022-07-05T03:46:17.520Z",
    "updatedAt": "2022-07-05T03:46:17.520Z",
    "__v": 0
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      providers: [ShortUrlRedirectionService]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ShortUrlRedirectionService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to post and return data  ', (done: DoneFn) => {

    service.getLongUrl("1SMCS").subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        done();
      },
      error: done.fail
    });

    const req:TestRequest = httpTestingController.expectOne(
      { method: 'GET', url:environment.apiURL+'urlShortener/searchByShortURL?shortURL=1SMCS' });
    req.flush(mockResponse);
  });
});
