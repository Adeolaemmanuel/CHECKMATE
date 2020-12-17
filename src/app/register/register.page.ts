import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app'
import { Platform, ToastController, IonRouterOutlet} from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import {  MenuController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  fName
  lName
  Email
  password
  Phone
  ID
  num = []

  async register(){ 

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
      this.db.collection('Users').doc(this.Phone).set({
        Firstname: this.fName,
        Lastname: this.lName,
        Email: this.Email,
        Password: this.password,
        Phone: this.Phone,
        Plan:'Basic',
        FriendsCount: 0
      })
      
      if(this.num.indexOf(this.Phone) == -1){
        const user = await this.auth.createUserWithEmailAndPassword(
          this.Email,
          this.password
        ).then(()=>{
          this.menuController.enable(true)
          this.db.collection('Friends').doc(this.Phone).set({})
          this.db.collection('Numbers').doc('Admin').update({
            number:firestore.FieldValue.arrayUnion(this.Phone)
          })
          this.db.collection('Panic').doc(this.Phone).set({ panic: 0})
          this.db.collection('Fence').doc(this.Phone).set({})
          this.Storage.set('email', this.Email)
          this.Storage.set("password", this.password)
          this.Storage.set('logged','verified')
          this.Storage.set('id', this.Phone)
          this.backgroundMode.enable();
          this.Storage.set('name',`${this.fName} ${this.lName}`)
          this.db.collection('Friends').doc(this.Phone).collection('Admin').doc('sent').set({number : []})
          this.db.collection('Friends').doc(this.Phone).collection('Admin').doc('recieved').set({number : []})
          this.db.collection('Friends').doc(this.Phone).collection('Admin').doc('confirmed').set({number : []})
          this.db.collection('Notifications').doc(this.Phone).collection('Admin').doc('read').set({read : []})
          this.db.collection('Notifications').doc(this.Phone).collection('Admin').doc('new').set({new : []})
          this.Nav.navigate(['Tabs/Tabs/Map', {id:this.Phone}])
        }).catch(async(e)=>{
          const alert = await this.alertController.create({
            header: 'Checkmate',
            subHeader: '',
            message: e,
            buttons: ['OK']
          });
      
          await alert.present(); 
          
        })
      }
    }
  }

  constructor(
    private backgroundMode: BackgroundMode,
    private platform: Platform,
    private toast: ToastController,
    private auth: AngularFireAuth, 
    private alertController: AlertController, 
    private Nav: Router, 
    private db: AngularFirestore, 
    private Storage: Storage, 
    private Functions: FunctionsService,
    private menuController: MenuController
    ) { }

  ngOnInit() {
    this.menuController.enable(false)
    this.db.collection('Numbers').doc('Admin').get().subscribe(num=>{
      this.num = [...num.data()['number']]
    })
  }

}
