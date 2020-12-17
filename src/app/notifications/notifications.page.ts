import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  ID
  not = []
  read = []

  Read(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    const read = this.not.splice(value,1)
    this.read.push(read)
    console.log(read);
    
    this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('read').update({
      read : read
    })
    this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('new').update({
      new : this.not
    })
  }

  display(event){
    if(event == 0){
      document.getElementById('not').classList.add('w3-show')
    }else{
      document.getElementById('not').classList.add('w3-hide')
    }
  }

  Del(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.read.splice(value,1)
    this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('read').update({
      read : this.read
    })

  }
  constructor(private route: ActivatedRoute, private auth: AngularFireAuth, private alertController: AlertController, private navCtrl: Router, private db: AngularFirestore, private Storage: Storage, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.Storage.get('id').then(prams=>{
      this.ID = prams
      this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('new').snapshotChanges().subscribe(not=>{
        if(not.payload.exists){
          this.not = [...not.payload.data()['new']] 
        }
      })
      this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('read').snapshotChanges().subscribe(not=>{
        if(not.payload.exists){
          this.read = [...not.payload.data()['read']] 
        }
      })
    })
  }

}
