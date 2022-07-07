import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

import { ShortUrlRedirectionService } from '../service/short-url-redirection.service';
import { ShortUrlRedirectionResolver } from './short-url-redirection.resolver';

class MockShortUrlRedirectionService {
  mockResponse = {
    "_id": "1SMCS",
    "longUrl": "http://www.google.com",
    "createdAt": "2022-07-05T03:46:17.520Z",
    "updatedAt": "2022-07-05T03:46:17.520Z",
    "__v": 0
  };

  getLongUrl(shortURL: string): Observable<any> {
    return of(this.mockResponse);
  }
}

let mockWindow = { location: { href: '' } };

describe('ShortUrlRedirectionResolver', () => {
  let resolver: ShortUrlRedirectionResolver;
  let route: ActivatedRouteSnapshot;
  let shortUrlService: ShortUrlRedirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ShortUrlRedirectionService,
          useClass: MockShortUrlRedirectionService,

        },
        {
          provide: Window,
          useValue: mockWindow
        }
      ]
    });
    route = new ActivatedRouteSnapshot();
    resolver = TestBed.inject(ShortUrlRedirectionResolver);
    shortUrlService = TestBed.inject(ShortUrlRedirectionService);
  });

  it('should be instance', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve and call shortUrlRedriectService', () => {
    route.params = { shortURL: '1SMCS' };
    resolver.resolve(route).subscribe(resolved => {
      // assert
      expect(resolved).toBeTruthy();
    });
    expect(resolver['window'].location.href).toEqual('http://www.google.com');
  })

  it('should call shortUrlRedriectService and return error', () => {
    route.params = { shortURL: '1SMCS' };
    spyOn(shortUrlService, 'getLongUrl').and.returnValue(throwError('Error'));

    resolver.resolve(route).subscribe(resolved => {
      // assert
      expect(resolved).toBeFalsy();
    });
  })

});
