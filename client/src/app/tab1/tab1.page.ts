import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRadio, IonRadioGroup, IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';
import {DataService} from "../services/data.service";
import {Log, PoliticianPublicData, ServerResponse} from "../interfaces";
import {IonicModule} from "@ionic/angular";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {

  politicianID: string = "";
  profile =  {
    name: "",
    photo: "",
    bio: "",
    party: "",
    constituency: "",
    roleTitle: ""
  }
  logs: Log[] = [];
  policies?: string[];

  // @ts-ignore
  private routeSub: Subscription;


  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    // @ts-ignore
    this.route.params.subscribe((params) => {
      this.politicianID = params['id']; // Read dynamic route param
      this.loadContent(this.politicianID); // Load content dynamically
    });
  }

  loadContent(politicianID: string) {
    if (politicianID) {
      console.log("Loading content for ID:", politicianID);
      this.dataService.getPoliticianData(politicianID).subscribe(
        (importData:ServerResponse) => {
          let details: PoliticianPublicData = importData.data as PoliticianPublicData;
          console.log("details", details);
          this.profile.name = details.profile.name;
          this.profile.photo = details.profile.photo;
          // @ts-ignore
          this.profile.bio = details.profile.bio;
          this.profile.party = details.profile.party;
          this.profile.constituency = details.profile.constituency;
          this.profile.roleTitle = details.profile.roleTitle;
          this.logs = details.logs;
          this.policies = details.policies;

        }
      )
    } else {
      console.log("No ID provided, loading default content");
    }
  }

  // ngOnDestroy() {
  //   if(this.routeSub) {
  //     this.routeSub.unsubscribe();
  //   }
  // }


}
