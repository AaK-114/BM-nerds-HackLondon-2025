import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from "@ionic/angular";
import {AuthStatus, AuthType, LoginData} from "../interfaces";
import {ModalController} from "@ionic/angular";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {

  loginType: AuthType = "login";

  loginData: LoginData = {
    username: "",
    password: "",
    confirmPassword: "",
    type: this.loginType
  }

  authStatus?: AuthStatus | "matchFalse";
  loginMessage = "";

  constructor(private modalController: ModalController, private loginService: LoginService) { }

  switchOption (e:any) {
    console.log("Login type:", this.loginType);
    this.loginType = e.detail.value;
  }

  logIn() {
    console.log("Login type:", this.loginType);
    this.loginData.type = "login";
    this.loginService.authenticateLogin(this.loginData)
      .then(status => {
        console.log("Login page status:", status);
        this.authStatus = status;
        if (this.authStatus === "authenticated") {
          this.loginMessage = "Login successful";
          console.log("User logged in");
          this.modalDismiss(true);
        } else {
          this.loginMessage = "Please check your username and password.";
        }
      })
    console.log("Login ended")
  }

  createAccount () {
    console.log("Create account clicked");
    this.loginData.type = "create";
    console.log(this.loginData);

    if (this.loginData.password && this.loginData.password === this.loginData.confirmPassword) {
      this.loginService.authenticateLogin(this.loginData).then(status => {
        console.log("Login page status:", status);
        this.authStatus = status;
        if (this.authStatus == "authenticated") {
          this.loginMessage = "Account created";
          console.log("New Account Created");
          this.modalDismiss(true);
        } else {
          this.loginMessage = "Account creation failed. Please try again.";
        }
      })
    } else if (!this.loginData.password) {
      this.authStatus = "matchFalse";
      this.loginMessage = "No password entered";
    } else {
      this.authStatus = "matchFalse";
      this.loginMessage = "Passwords do not match";
    }
  }

  modalDismiss (auth? :any) {
    console.log("auth:", auth);
    this.modalController.dismiss(auth, undefined, "login");
  }

}
