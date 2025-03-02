import { Injectable } from '@angular/core';
import { AuthStatus, LoginData } from "../interfaces";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public activeUser: string = "";

  constructor(private dataService: DataService) { }

    authenticateLogin(loginData: LoginData): Promise<AuthStatus> {
    loginData.password = this.hashPassword(loginData.password);

    return new Promise(resolve => {

      if (loginData.type == "create") {
        this.dataService.createUser(loginData).subscribe(res => {
          console.log("res:", res);
          resolve(this.checkStatus(res.userAuth, res.passwordAuth, loginData));
        }, err => {
          console.log("err:", err)
          if (err.status == 406) {
            console.log(err.status, "login.service found 406");
            resolve("exists");
          }
        })
      } else if (loginData.type == "login") {
        this.dataService.verifyUser(loginData).subscribe(res => {
          console.log("res:", res);
          resolve(this.checkStatus(res.userAuth, res.passwordAuth, loginData));
        })
      } else {
        console.log("Error in login type:", loginData.type);
        resolve("usernameFalse")
      }
    })
  }

  // @ts-ignore
  checkStatus (userAuth: boolean, passwordAuth: boolean, loginData: LoginData): AuthStatus {
    if (userAuth && passwordAuth) {
      this.dataService.updateUser(loginData.username);
      return "authenticated";
    } else if (userAuth && !passwordAuth) {
      return "usernameFalse";
    }
  }

  hashPassword(password: string): string {
    return password;
  }

  logOut () {
    // @ts-ignore
    this.dataService.updateUser(undefined);
  }

}

