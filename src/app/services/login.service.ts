import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Credentials {
  username: string;
  password: string;
}

export const environment = {
  production: false,
  apiUrl: 'https://tweet-mfrp.onrender.com'
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.apiUrl;
  cred: any;

  constructor(private http: HttpClient) { }

  getToken(credentials: Credentials) {
    return this.http.post(`${this.baseUrl}/login`, credentials, 
      { 
        headers: { skip: 'true' },
        withCredentials: true
      })
      .pipe(
        catchError(error => {
          console.error('Error occurred while logging in:', error);
          return throwError(() => new Error('Login failed. Please try again.'));
        })
      );
  }

  isLoggedIn() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') != null;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('token');
  }
  token() {
    return localStorage.getItem('token');
  }

  registerUser(credentials: any) {
    return this.http.post(`${this.baseUrl}/register`, credentials, { headers: { skip: "true" } });
  }

  forgotPassword(username: string,oldPassword: string, newPassword: string) {
    this.cred = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    return this.http.put(`${this.baseUrl}/${username}/forgot`, this.cred, { headers: { skip: "true" } });
  }
}