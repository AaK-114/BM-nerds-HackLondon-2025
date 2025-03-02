import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import { ServerResponse } from "../interfaces";

import {DataService} from "../services/data.service";
import {LoginService} from "../services/login.service";
import {ModalService} from "../services/modal.service";
import {addIcons} from "ionicons";
import {personSharp, close} from "ionicons/icons";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [ModalService]
})
export class ProfilePage implements OnInit {

  loggedIn?: boolean;
  activeUser?: string;

  constructor(private modalController: ModalController, private dataService: DataService, private loginService: LoginService, private modalService: ModalService) {
    addIcons({ personSharp, close });

  }

  logIn() {
    this.modalService.logIn().then(auth => {
      console.log("triggered");
      this.loggedIn = auth;
    })
  }

  logOut() {
    console.log("Button clicked: User logged out");
    this.loggedIn == !this.loggedIn;
    this.activeUser = "";
    this.loginService.logOut();
    this.modalDismiss();
  }

  modalDismiss () {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.dataService.getUser().subscribe((user => {
      if (user) {
        this.loggedIn = true;
      } else {
        console.log("User not logged in");
        this.loggedIn = false;
      }
      this.activeUser = user;
    }))

    // this.getUserData()
  }

}
