import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  Firstname
  Lastname
  Id 
  ID 
  friendsCount
  Plan
  Email
  ProfilePicUrl


  friends(){
    this.navCtrl.navigate(['Friends',{id:this.ID}])
  }

  upload(event){
    this.Storage.get('email').then(prams=>{
     var file = event.target.files[0]
     var read = new FileReader()
      this.storage.ref('Profile/'+prams)
      this.storage.upload('Profile/'+prams, file);
      setInterval(()=>{
        file.onload = ()=>{
          this.storage.ref('Profile/'+prams).getDownloadURL();   
      }}, 2000)
    })
  }

  refresh(event){
    this.ngOnInit() 
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  constructor(
    private route: ActivatedRoute, 
    private auth: AngularFireAuth, 
    private alertController: AlertController, 
    private navCtrl: Router, 
    private db: AngularFirestore, 
    private Storage: Storage, 
    private storage: AngularFireStorage,
    private nav: NavController, 
    ) {
    Storage.get('id').then(prams=>{
      this.ID = prams
    })
   }

  ngOnInit() {
    //Get details of users profile 
    this.Storage.get('id').then(prams=>{
      this.ID = prams
      this.db.collection('Users').doc(`${prams}`).snapshotChanges().subscribe(data=>{
        if(data.payload.exists){ 
          this.Firstname = data.payload.data()['Firstname']
          this.Lastname = data.payload.data()['Lastname']
          this.Id = data.payload.data()['Phone']
          this.Plan = data.payload.data()['Plan']
          this.Email = data.payload.data()['Email']
          this.Storage.get('email').then(prams=>{
            this.ProfilePicUrl = this.storage.ref('Profile/'+prams).getDownloadURL();
          })
        }
      })
    })
  }

}

