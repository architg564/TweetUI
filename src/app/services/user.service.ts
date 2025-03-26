import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "https://tweet-mfrp.onrender.com";

  constructor(private http: HttpClient) { }

  searchUser(userName: string) {

    return this.http.get(`${this.baseUrl}/user/search/${userName}`);
  }
  getAllUsers() {

    return this.http.get(`${this.baseUrl}/user/all`);
  }
}