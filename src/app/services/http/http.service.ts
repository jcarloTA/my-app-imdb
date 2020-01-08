import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(endpoint: string, params: any = {}) {
      params.api_key = environment.API_KEY;
      return this.http.get(environment.API_URL + endpoint, {headers : this.getHeaders(), 'params' : params});
  }

  post(endpoint: string, body?: any) {
      return this.http.post(environment.API_URL + endpoint, body, {headers : this.getHeaders()});
  }

  put(endpoint: string, body: any) {
      return this.http.put(environment.API_URL + endpoint, body, {headers : this.getHeaders()});
  }

  delete(endpoint: string) {
      return this.http.delete(environment.API_URL + endpoint, {headers : this.getHeaders()});
  }

  patch(endpoint: string, body: any) {
      return this.http.put(environment.API_URL + endpoint, body, {headers : this.getHeaders()});
  }

  private getHeaders() : HttpHeaders {
      return new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      });
  }
}
