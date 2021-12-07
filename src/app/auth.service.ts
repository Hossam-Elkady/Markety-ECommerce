import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject();
  constructor(private _HttpClient: HttpClient) { }
  signUp(registerData: any): Observable<any> {
    this.user = registerData.first_name;
    return this._HttpClient.post("https://routeegypt.herokuapp.com/signup", registerData)
  }
  signIn(loginData: any): Observable<any> {
    return this._HttpClient.post("https://routeegypt.herokuapp.com/signin", loginData)
  }
  getUserName(userName: string) {
    sessionStorage.setItem("name", userName);
    this.user.next(userName)
  }
}

