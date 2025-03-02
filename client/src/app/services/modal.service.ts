import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController) {}

  async logIn (): Promise<boolean> {
    const modal = await this.modalController.create({
      component: LoginPage,
      id: "login"
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data;
  }

}
