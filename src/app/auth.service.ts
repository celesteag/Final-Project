import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<any>{
    const token: string = localStorage.getItem('token') ?? "";
    const headers = new HttpHeaders({
      "Authorization":  "Bearer "+token
    });
    return this.http.post(`${this.apiUrl}register`, {username, password}, {headers: headers});
  }

  login(username: string, password: string): Observable<any>{
    const token: string = localStorage.getItem('token') ?? "";
    const headers = new HttpHeaders({
      "Authorization":  "Bearer "+token
    });
    return this.http.post(`${this.apiUrl}login`, {username, password}, {headers: headers});
  }

  protected(): Observable<any>{
    const token: string = localStorage.getItem('token') ?? "";
    const headers = new HttpHeaders({
      "Authorization":  "Bearer "+token
    });
    return this.http.get(`${this.apiUrl}protected`, {headers: headers});
  }
  

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): boolean {
    return (typeof localStorage.getItem('token') == "string");
  }
}
