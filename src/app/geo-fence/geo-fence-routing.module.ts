import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoFencePage } from './geo-fence.page';

const routes: Routes = [
  {
    path: '',
    component: GeoFencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeoFencePageRoutingModule {}
