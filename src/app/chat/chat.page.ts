import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Contacts } from '@ionic-native/contacts/ngx';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { firestore } from 'firebase/app'
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  ID
  Confirmed = []
  confirmed = []
  Cpictures = []
  name

  message(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    const index = this.confirmed[value]
    var name = this.Confirmed[value]
    
    this.navCtrl.navigate(['/Message',{id: index, name: name}])
    this.db.collection('Chat').doc(`${this.ID}|${index}`).get().subscribe(data=>{
      if(data.exists){}
      else{
        this.db.collection('Chat').doc(`${index}|${this.ID}`).set({
          message : [],
        })
        this.db.collection('Chat').doc(`${this.ID}|${index}`).set({
          message : [],
        })
      }
    })
  }

  constructor(private platform: Platform, private location: Location, private route: ActivatedRoute, private auth: AngularFireAuth, private alertController: AlertController, private navCtrl: Router, private db: AngularFirestore, private Storage: Storage, private storage: AngularFireStorage, private Functions: AngularFireFunctions, private contacts: Contacts ) { }

  ngOnInit() {

    this.Storage.get('id').then(id=>{
      this.ID = id
      this.db.collection('Friends').doc(this.ID).collection('Admin').doc('confirmed').get().subscribe(confirmed=>{
        if(confirmed.exists){
          this.confirmed = confirmed.data()['number']
          for(const c in this.confirmed){
            this.db.collection('Users').doc(`${this.confirmed[c]}`).get().subscribe(data=>{
              this.name = `${data.data()['Firstname']} ${data.data()['Lastname']}`
              this.Cpictures.push(this.storage.ref('Profile/'+data.data()['Email']).getDownloadURL())
              this.Confirmed.push(this.name)
            })
          }
        }
      })
    })

  }
  

}
