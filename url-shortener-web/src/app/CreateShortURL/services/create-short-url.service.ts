import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreateShortURLService {

  constructor(private http: HttpClient) { }

  private getApiURL(): string {
    return environment.apiURL+"urlShortener/";
  }
  public createShortURL(longURL: String): Observable<any> {
    const req = {longURL: longURL}
    return this.http.post(this.getApiURL()+"create", req);
  }

}
