import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrafficPageRoutingModule } from './traffic-routing.module';

import { TrafficPage } from './traffic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrafficPageRoutingModule
  ],
  declarations: [TrafficPage]
})
export class TrafficPageModule {}
