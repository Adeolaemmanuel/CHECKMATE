import { Component, OnInit, ViewChild } from '@angular/core';
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
declare var google


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  lat: number
  lng : number
  Map
  style
  zoom: number = 6
  name
  img


  constructor(private platform : Platform, private location : Location, private Storage: Storage, private route : Router, private active: ActivatedRoute) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.location.back()
    });
   }


  ngOnInit() {
    this.active.params.subscribe(prams=>{
      this.lat = parseFloat(prams.lat)
      this.lng = parseFloat(prams.lng)
      this.name = prams.name
      this.img = prams.img
    })
  }

}
