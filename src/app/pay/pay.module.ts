import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPageRoutingModule } from './pay-routing.module';
import { Angular4PaystackModule } from 'angular4-paystack';
import { PayPage } from './pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPageRoutingModule,
    Angular4PaystackModule.forRoot('pk_live_246eb0b650b154157de704a228601b7e51f0f674')
  ],
  declarations: [PayPage]
})
export class PayPageModule {}
