import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonSearchbar],
})
export class AppComponent {
  constructor() {}
}
