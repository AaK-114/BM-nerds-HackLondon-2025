import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeCircle } from 'ionicons/icons';


import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-choices-modal',
  templateUrl: './choices-modal.component.html',
  styleUrls: ['./choices-modal.component.scss'],
  imports: [FormsModule, CommonModule, IonicModule]
})
export class ChoicesModalComponent {

  name!: string;
  selectedSegment: string = "topics";

  topicList = [
    "food",
    "health",
    "education",
    "environment",
    "culture",
    "sports",
    "politics",
    "business",
    "technology",
  ]

    politicianList = [
      "John Doe",
      "Jane Smith",
      "Robert Johnson",
      "Emily Davis",
      "Michael Brown",
      "Sophia Wilson",
      "William Moore",
      "Isabella Taylor",
      "James Anderson",
      "Olivia Martinez"
    ]

  // segmentChanged() {
  //   console.log('Selected Segment:', this.selectedSegment);
  // }

  constructor(private modalController: ModalController) {
    addIcons({ closeCircle });
  }

  cancel() {
    return this.modalController.dismiss(null, "cancel");
  }
  confirm() {
    return this.modalController.dismiss(this.name, "confirm");
  }
}

