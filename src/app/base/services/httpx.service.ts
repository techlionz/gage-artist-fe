import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpxService {

  constructor(private http: HttpClient) { }

  headers() {
    let token = localStorage.getItem("token") ;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  console.log(token) ;
    return reqHeader ;
  }
  get(url: string): any {
    console.log(url) ;
    // url += '&XDEBUG_SESSION_START=netbeans-xdebug' ;
    return this.http.get<any>(url, { headers: this.headers() })
  }
  post(url: string, body: any): any {
    return this.http.post<any>(url, body, { headers: this.headers() });
  }
  put(url: string, body: any): any {
    return this.http.put<any>(url, body, { headers: this.headers() });
  }
  delete(url: string): any {
    return this.http.delete<any>(url, { headers: this.headers() });
  }
}
