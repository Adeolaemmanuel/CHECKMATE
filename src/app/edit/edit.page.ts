import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  Firstname
  Lastname
  Email
  Password
  ID

  submit(){
    this.Storage.get('id').then(id=>{
      this.auth.signInWithEmailAndPassword(this.Email, this.Password).then(()=>{
        this.db.collection('Users').doc(id).update({
          Firstname: this.Firstname,
          Lastname : this.Lastname
        })
      })
    })
  }

  constructor(private platform: Platform, private location: Location ,private auth : AngularFireAuth, private db : AngularFirestore, private Storage : Storage) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back()
    });
   }

  ngOnInit() {
  }

}
