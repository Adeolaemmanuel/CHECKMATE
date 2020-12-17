import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';
import { AngularFirestore  } from '@angular/fire/firestore';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { firestore } from 'firebase/app'
import { FunctionsService } from '../functions.service';




@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  ID

  Dash(event){
    this.db.collection('Users').doc(this.ID).get().subscribe(data=>{
      if(data.exists){
        if(data.data()['Plan'] == 'Basic' && (event == 'geo-fence' || event == 'unknown')){
          (async ()=>{
            const alert = await this.alertController.create({
              header: 'Checkmait',
              message: '<strong>Upgrage to use this function</strong>!!!',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    this.Functions.bigAlert('Upgrade Cancelled')
                  }
                }, {
                  text: 'Okay',
                  handler: () => {
                    this.navCtrl.navigate(['/Pay'])
                  }
                }
              ]
            });
        
            await alert.present();
          })()
        }else{
          this.navCtrl.navigate([`/${event}`])
        }
      }
    })
  }

  Panic(){
    this.Functions.PANIC(this.ID)
    this.Functions.panic(this.ID)
    this.Functions.bigAlert('Emergency Buzz sent!!!')
  }
  

  constructor(
    private location: Location, 
    private route: ActivatedRoute, 
    private auth: AngularFireAuth, 
    private alertController: AlertController, 
    private navCtrl: Router, 
    private db: AngularFirestore, 
    private Storage: Storage, 
    private storage: AngularFireStorage, 
    private contacts: Contacts,
    private Functions: FunctionsService,
    private nav: NavController
    ) { }

  ngOnInit() {
    this.Storage.get('id').then(id=>{
      this.ID = id
    })
  }


}
