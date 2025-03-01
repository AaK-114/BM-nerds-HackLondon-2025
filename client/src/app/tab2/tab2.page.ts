import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonAvatar, IonChip, IonIcon, IonLabel, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { close, closeCircle, pin } from 'ionicons/icons';

interface Politician {
  name: string;
  image: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonSearchbar, IonAvatar, IonChip, IonIcon, IonLabel, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, CommonModule, FormsModule ]
})


export class Tab2Page {

  searchQuery: string = '';
  
  CabinetPoliticians: Politician[] = [
    { name: 'Corrupt Politician', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Kray Zee Mann', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'The one nobody remembers', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Elmo Tusk', image: 'https://ionicframework.com/docs/img/demos/card-media.png' }
  ];
  LocalPoliticians: Politician[] = [
    { name: 'Charitable Satanist', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Environmental Activist', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Nepo Baby', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
  ];
  InternationalPoliticians: Politician[] = [
    { name: 'Elmo Husk', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Person who actually does their job', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Luke Atmey', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
  ];
  SupportedPoliticians: Politician[] = [
    { name: 'Environmental Activist', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Person who actually does their job', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Charitable Satanist', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
  ];
  NeutralPoliticians: Politician[] = [
    { name: 'The one nobody remembers', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Nepo Baby', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Luke Atmey', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
  ];
  DislikedPoliticians: Politician[] = [
    { name: 'Elmo Husk', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Corrupt Politician', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
    { name: 'Kray Zee Mann', image: 'https://ionicframework.com/docs/img/demos/card-media.png' },
  ];

  filteredCabinetPoliticians = [...this.CabinetPoliticians];
  filteredLocalPoliticians = [...this.LocalPoliticians];
  filteredInternationalPoliticians = [...this.InternationalPoliticians];
  filteredSupportedPoliticians = [...this.SupportedPoliticians];
  filteredNeutralPoliticians = [...this.NeutralPoliticians];
  filteredDislikedPoliticians = [...this.DislikedPoliticians];
  
  constructor() {
    addIcons({ close, closeCircle, pin });
  }

  filterPoliticians(event: any) {
    const searchTerm = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search

    if (!searchTerm) {
      this.filteredCabinetPoliticians = [...this.CabinetPoliticians];
      this.filteredLocalPoliticians = [...this.LocalPoliticians];
      this.filteredInternationalPoliticians = [...this.InternationalPoliticians];
      this.filteredSupportedPoliticians = [...this.SupportedPoliticians];
      this.filteredNeutralPoliticians = [...this.NeutralPoliticians];
      this.filteredDislikedPoliticians = [...this.DislikedPoliticians];
      return;
    }

    // Apply filtering for each category separately
    this.filteredCabinetPoliticians = this.CabinetPoliticians.filter(politician =>
      politician.name.toLowerCase().includes(searchTerm)
    );

    this.filteredLocalPoliticians = this.LocalPoliticians.filter(politician =>
      politician.name.toLowerCase().includes(searchTerm)
    );

    this.filteredInternationalPoliticians = this.InternationalPoliticians.filter(politician =>
      politician.name.toLowerCase().includes(searchTerm)
    );

    this.filteredSupportedPoliticians = this.SupportedPoliticians.filter(politician =>
      politician.name.toLowerCase().includes(searchTerm)
    );

    this.filteredNeutralPoliticians = this.NeutralPoliticians.filter(politician =>
      politician.name.toLowerCase().includes(searchTerm)
    );

    this.filteredDislikedPoliticians = this.DislikedPoliticians.filter(politician =>
      politician.name.toLowerCase().includes(searchTerm)
    );
  }

}
