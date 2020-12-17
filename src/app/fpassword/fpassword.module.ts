import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FpasswordPageRoutingModule } from './fpassword-routing.module';

import { FpasswordPage } from './fpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FpasswordPageRoutingModule
  ],
  declarations: [FpasswordPage]
})
export class FpasswordPageModule {}
