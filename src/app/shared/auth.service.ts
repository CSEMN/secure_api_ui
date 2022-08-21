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
    return this.http.post('https://secure-api-jwt.herokuapp.com/api/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('https://secure-api-jwt.herokuapp.com/api/login', user);
  }
  google_signin(): Observable<any> {
    return this.http.get<any>('https://secure-api-jwt.herokuapp.com/api/google/redirect');
  }
  github_signin(): Observable<any> {
    return this.http.get<any>('https://secure-api-jwt.herokuapp.com/api/github/redirect');
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('https://secure-api-jwt.herokuapp.com/api/profile');
  }
}
