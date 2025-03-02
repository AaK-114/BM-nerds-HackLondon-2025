import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ServerResponse, LoginData, LoginResponse} from "../interfaces";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = "http://localhost:3000/hack25/";

  private options = {
    observe: "body" as const
  }

  private activeUser: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.activeUser = new BehaviorSubject<string>(undefined);
  }

  createUser(loginData: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + `auth/${loginData.username}/${loginData.password}`, this.options);
  }

  verifyUser(loginData: LoginData): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.url + `auth/${loginData.username}/${loginData.password}`, this.options);
  }

  updateUser(user: string) {
    this.activeUser.next(user);
  }

  getUser() {
    return this.activeUser.asObservable();
  }

  fetchUser() :string {
    let activeUser;
    this.getUser().subscribe(user => {
      activeUser = user;
    })
    // @ts-ignore
    return activeUser;
  }


  getUserData(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.url + 'user/' + this.fetchUser(), this.options)
  }

  getPoliticianData(id: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.url + 'politician/' + id, this.options)
  }


}
