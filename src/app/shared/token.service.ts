import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: 'http://secure-api-jwt.herokuapp.com/api/login',
    register: 'http://secure-api-jwt.herokuapp.com/api/register',
    google:'http://secure-api-jwt.herokuapp.com/api/google/auth'
  };
  constructor() {}
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
