import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { Platform, ToastController, IonRouterOutlet} from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import {  MenuController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email
  Password
  id
  Phone
  async Log(){
    this.backgroundMode.enable();
    const login = this.auth.signInWithEmailAndPassword(
      this.Email, 
      this.Password
    ).then(()=>{
      this.db.collection('Users').doc(`${this.Phone}`).get().subscribe(data => {
        this.menuController.enable(true)
        this.id = data.data()['Email']
        if (this.id == this.Email) {
          if(this.Phone.includes('+')){
            let toast = this.toast.create({
              message: `Remove contry code to add number`,
              duration: 3000,
              position: 'top',
              color : 'danger'
            }).then((toast)=>{
              toast.present();
            })
          }else{
            this.storage.set('email', this.Email)
            this.storage.set("password", this.Password)
            this.storage.set('logged',true)
            this.storage.set('id',this.Phone)
            this.router.navigate(['Tabs/Tabs/Map',{id:this.Phone}])
          }
          
        } else {
          (async () => {
            const alert = await this.alertController.create({
              header: 'CHECKMATE',
              subHeader: '',
              message: 'This number is not registered with this account',
              buttons: ['OK']
            });
            await alert.present(); 
          })()
        }
      })    
    }).catch(async (e)=>{
      const alert = await this.alertController.create({
        header: 'CHECKMATE',
        subHeader: '',
        message: e,
        buttons: ['OK']
      });
  
      await alert.present(); 
      
    })
    
  }

  constructor(private backgroundMode: BackgroundMode, private platform: Platform,private toast: ToastController, private db: AngularFirestore, private geolocation: Geolocation, private router: Router, private auth: AngularFireAuth, private alertController: AlertController, private storage: Storage, private Functions: FunctionsService, private menuController: MenuController ) {
    
   }

  ngOnInit() {
    this.menuController.enable(false)
  }

}
