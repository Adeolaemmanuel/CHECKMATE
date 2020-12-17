import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { firestore } from 'firebase/app'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  Confirmed = []
  confirmed = []
  Cpictures = []
  lat
  lng
  ID
  name

  back() {
    this.location.back();
  }

  refresh(event){

  }

  view(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

    this.db.collection('Location').doc(`${this.confirmed[value]}`).snapshotChanges().subscribe(data=>{
      this.lat = parseFloat(data.payload.data()['lat'])
      this.lng = parseFloat(data.payload.data()['lng'])
      this.navCtrl.navigate(['/View',{lat: this.lat, lng: this.lng, img: '', name: this.Confirmed[value]}])
    })
  }

  constructor(private platform: Platform, private location: Location, private route: ActivatedRoute, private auth: AngularFireAuth, private alertController: AlertController, private navCtrl: Router, private db: AngularFirestore, private Storage: Storage, private storage: AngularFireStorage, private Functions: AngularFireFunctions, private contacts: Contacts ) { }

  ngOnInit() {
    this.Storage.get('id').then(id=>{
      this.ID = id
      this.db.collection('Friends').doc(`${this.ID}`).collection('Admin').doc('confirmed').snapshotChanges().subscribe(confirmed=>{
        if(confirmed){
          this.confirmed = [...confirmed.payload.data()['number']]
          for(const c in this.confirmed){
            this.db.collection('Users').doc(`${this.confirmed[c]}`).snapshotChanges().subscribe(data=>{
              this.name = `${data.payload.data()['Firstname']} ${data.payload.data()['Lastname']}`
              this.Cpictures.push(this.storage.ref('Profile/'+data.payload.data()['Email']).getDownloadURL())
              this.Confirmed.push(this.name)
            })
            console.log(this.confirmed);
            
          }
        }
      })
     })

    this.platform.backButton.subscribeWithPriority(0, () => {
      this.location.back()
    });
  }

}
