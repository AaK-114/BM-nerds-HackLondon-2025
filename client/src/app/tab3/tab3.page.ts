import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController, IonText, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import {ChoicesModalComponent} from "../choices-modal/choices-modal.component";

import { addIcons } from 'ionicons';
import { create } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [FormsModule, IonText, IonIcon, IonFab, IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab3Page {
  constructor(private modalController: ModalController) {
    addIcons({ create });
  }

  message = "This modal is an example."
  inputData = {
    name: "John",
    age: 30,
    gender: "male"
  }
  outputData = {
    name: "John",
    age: 30,
    gender: "male"
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ChoicesModalComponent,
      componentProps: {
        message: this.message,
        inputData: this.inputData
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = data.message;
    }
  }


}
