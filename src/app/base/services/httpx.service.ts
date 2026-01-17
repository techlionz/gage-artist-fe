import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
   * Generates the standard set of HTTP headers required for API calls.
   * This includes the JSON content type and the Bearer token for authentication.
   */

@Injectable({
  providedIn: 'root'
})
export class HttpxService {

  constructor(private http: HttpClient) { }

  headers() {
    // Retrieve the auth token saved during the login process
    let token = localStorage.getItem("token") ;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  console.log(token) ;
    return reqHeader ;
  }

  /**
   * Performs an HTTP GET request with auto-attached auth headers.
   */
  get(url: string): any {
    console.log(url) ;
    // url += '&XDEBUG_SESSION_START=netbeans-xdebug' ;
    return this.http.get<any>(url, { headers: this.headers() })
  }

  /**
   * Performs an HTTP POST request.
   * Note: If 'body' is FormData (like in your saveChanges method), 
   * the 'Content-Type' in headers() might need to be omitted.
   */
  post(url: string, body: any): any {
    return this.http.post<any>(url, body, { headers: this.headers() });
  }

  /**
   * Performs an HTTP PUT request (typically used for updates).
   */
  put(url: string, body: any): any {
    return this.http.put<any>(url, body, { headers: this.headers() });
  }

  /**
   * Performs an HTTP DELETE request.
   */
  delete(url: string): any {
    return this.http.delete<any>(url, { headers: this.headers() });
  }
}
