import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1', // latest
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab1/:id', // latest
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3', // Topics
        redirectTo: '/tabs/profile',
        // loadComponent: () =>
        //   import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'profile', // profile
        loadComponent: () =>
          import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full',
  },
];
