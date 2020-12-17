import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';




@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {

  Firstname
  Lastname
  Id
  Plan
  Email
  ProfilePicUrl
  number

  

  constructor(
    private prams: ActivatedRoute,
    private db : AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.prams.params.subscribe(prams=>{
      this.number = prams.number
      this.db.collection('Users').doc(`${prams.number}`).snapshotChanges().subscribe(data=>{
        if(data.payload.exists){ 
          this.Firstname = data.payload.data()['Firstname']
          this.Lastname = data.payload.data()['Lastname']
          this.Id = data.payload.data()['Phone']
          this.Plan = data.payload.data()['Plan']
          this.Email = data.payload.data()['Email']
          this.ProfilePicUrl = this.storage.ref('Profile/'+this.Email).getDownloadURL();

        }
      })
    })
  }

}
