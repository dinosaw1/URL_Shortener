import { Injectable , Inject} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, ReplaySubject, of, tap } from 'rxjs';
import { ShortUrlRedirectionService } from '../service/short-url-redirection.service';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlRedirectionResolver implements Resolve<boolean> {
  constructor(
    private shortUrlRedriectService: ShortUrlRedirectionService,
    private window: Window
    ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> {
    const shortURL = route.paramMap.get('shortURL');
    let subject = new ReplaySubject<boolean>(1);
    if (shortURL) {
      this.shortUrlRedriectService.getLongUrl(shortURL).subscribe({
        next: (response) => {
          if (response.longUrl) {
            this.window.location.href = response.longUrl
          }
        },
        error: (e) => {
          subject.next(false);
          subject.complete();
        }
      });
    }
    return subject;
  }
}
