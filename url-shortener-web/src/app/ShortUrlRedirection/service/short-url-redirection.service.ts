import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlRedirectionService {

  constructor(private http: HttpClient) { }

  private getApiURL(): string {
    return environment.apiURL + "urlShortener/";
  }

  public getLongUrl(shortURL: string): Observable<any> {
    let params = new HttpParams().set('shortURL', shortURL);
    return this.http.get(this.getApiURL() + "searchByShortURL",  { params: params });
  }
}
