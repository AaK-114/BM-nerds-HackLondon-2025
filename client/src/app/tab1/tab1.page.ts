import { Component, NgModule } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRadio, IonRadioGroup, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, CommonModule, IonRadio, IonRadioGroup, IonCol, IonGrid, IonRow],
})
export class Tab1Page {
  isExpanded = false;
  toggleSection() {
    this.isExpanded = !this.isExpanded;
  }
  constructor() {}
}
