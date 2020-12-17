import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrafficPage } from './traffic.page';

const routes: Routes = [
  {
    path: '',
    component: TrafficPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrafficPageRoutingModule {}
