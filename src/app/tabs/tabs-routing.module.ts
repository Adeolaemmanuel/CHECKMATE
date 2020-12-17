import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'Tabs',
    component: TabsPage,
    children: [
      {
        path: 'Dashboard',
        loadChildren: () => import('../folder/folder.module').then(m => m.FolderPageModule)
      },
      {
        path: 'Profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'Map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'Chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'Friends',
        loadChildren: () => import('../friends/friends.module').then( m => m.FriendsPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'Tabs/Dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
