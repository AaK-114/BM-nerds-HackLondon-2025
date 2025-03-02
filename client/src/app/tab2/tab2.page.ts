import {Component, OnInit} from '@angular/core';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { close, closeCircle, pin } from 'ionicons/icons';
import { DataService } from "../services/data.service";
import {PoliticianPublicData, ServerResponse, userDataExport} from "../interfaces";
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

interface Politician {
  name: string;
  image: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})

export class Tab2Page implements OnInit {

  yayPoliticians: PoliticianPublicData[] = [];
  maybePoliticians: PoliticianPublicData[] = [];
  nayPoliticians: PoliticianPublicData[] = [];

  topicPosts: PoliticianPublicData[] = [];

  constructor(private dataService: DataService, private router: Router) {
    addIcons({ close, closeCircle, pin });
  }

  ngOnInit() {
    this.dataService.getUser().subscribe(user => {
      console.log("Logged in as:", user);
      this.getUserData();
    })
  }

  getUserData() {
    this.dataService.getUserData().subscribe((res: ServerResponse) => {
      let dataImport = res.data as userDataExport;
      this.yayPoliticians = dataImport.yayPeople // imports as a list of PPL
      this.maybePoliticians = dataImport.maybePeople // imports as a list of PPL
      this.nayPoliticians = dataImport.nayPeople // imports as a list of PPL

      this.topicPosts = dataImport.topicPosts // imports as a list of PPL

      console.log(this.yayPoliticians, this.maybePoliticians, this.nayPoliticians, this.topicPosts);
    })
  }

  openBio(politicianID: string) {
    this.router.navigate(['tabs', 'tab1', politicianID]);

  }







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
