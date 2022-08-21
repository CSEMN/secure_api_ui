import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', user);
  }
  google_signin(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/google/redirect');
  }
  github_signin(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/api/github/redirect');
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/profile');
  }
}
