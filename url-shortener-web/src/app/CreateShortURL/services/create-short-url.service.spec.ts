import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { CreateShortURLService } from './create-short-url.service';

describe('CreateShortURLService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CreateShortURLService;

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
      providers: [CreateShortURLService]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CreateShortURLService);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to post and return data  ', (done: DoneFn) => {

    service.createShortURL("http://www.google.com").subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        done();
      },
      error: done.fail
    });

    const req = httpTestingController.expectOne(
      { method: 'POST', url:environment.apiURL+"urlShortener/create"});
    expect(req.request.body).toEqual({longURL: "http://www.google.com"});
    req.flush(mockResponse);
  });
});
