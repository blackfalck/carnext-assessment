import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.set('Accept', 'multipart/form-data');
    this.headers.set('responseType', 'blob');
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }

  get(urlPart) {
    const url = environment.apiUrl + urlPart;
    return this.http.get(url).toPromise();
  }

  post(urlPart, data) {
    const config: any = {};
    config.headers = this.headers;
    const url = environment.apiUrl + urlPart;
    return this.http.post(url, data, config).toPromise();
  }

  put(urlPart, data) {
    const url = environment.apiUrl + urlPart;
    return this.http.put(url, data).toPromise();
  }

  delete(urlPart) {
    const url = environment.apiUrl + urlPart;
    return this.http.delete(url).toPromise();
  }
}
