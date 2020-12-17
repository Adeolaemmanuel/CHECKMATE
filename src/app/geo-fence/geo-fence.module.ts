import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoFencePageRoutingModule } from './geo-fence-routing.module';

import { GeoFencePage } from './geo-fence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoFencePageRoutingModule
  ],
  declarations: [GeoFencePage]
})
export class GeoFencePageModule {}
