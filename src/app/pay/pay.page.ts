import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireFunctions } from '@angular/fire/functions';;
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { firestore } from 'firebase/app'
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  Plan
  email
  stan
  prem 
  ref
  rate
  pay
  ID
  month = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
  Date = new Date()

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(event) {
    if(event == 'Premium'){
      this.db.collection('Users').doc(this.ID).update({
        Plan: 'Premium',
        payDate: `${this.month[this.Date.getMonth()]} ${this.Date.getDay()}, ${this.Date.getFullYear()}`,
        nextPay: `${this.month[this.Date.getMonth()+1]} ${this.Date.getDay()}, ${this.Date.getFullYear()}`
      })
    }else if(event == 'Standard'){
      this.db.collection('Users').doc(this.ID).update({
        Plan: 'Standard',
        payDate: `${this.month[this.Date.getMonth()]} ${this.Date.getDay()}, ${this.Date.getFullYear()}`,
        nextPay: `${this.month[this.Date.getMonth()+1]} ${this.Date.getDay()}, ${this.Date.getFullYear()}`
      })
    }
  }

  paymentCancel() {
    console.log('payment failed');
  }


  constructor(private platform: Platform, private location: Location, private route: ActivatedRoute, private auth: AngularFireAuth, private alertController: AlertController, private navCtrl: Router, private db: AngularFirestore, private Storage: Storage, private storage: AngularFireStorage, private Functions: AngularFireFunctions, private contacts: Contacts ) { }

  ngOnInit() {
    console.log(`${this.Date.getHours()}:${this.Date.getMinutes()}:${this.Date.getSeconds()}`);
    this.ref = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.db.collection('Admin').doc('rate').snapshotChanges().subscribe(stats=>{
      this.rate = stats.payload.data()['rate']
      this.prem = (12 * this.rate) * 100
      this.stan = (5 * this.rate) * 100
    })
    this.Storage.get('id').then(id=>{
      this.ID = id
      this.db.collection('Users').doc(id).get().subscribe(data=>{
        if(data.exists){
          this.Plan = data.data()['Plan']
          this.email = data.data()['Email']
          this.pay = data.data()['nextpay']
        }
      })
    })
  }

}
