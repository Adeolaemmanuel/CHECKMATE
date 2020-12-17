import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FpasswordPage } from './fpassword.page';

const routes: Routes = [
  {
    path: '',
    component: FpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FpasswordPageRoutingModule {}
