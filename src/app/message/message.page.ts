import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { firestore } from 'firebase/app'
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
  styles:[`
    .left{float:left!important}
    .right{float:right!important}
  `]
})
export class MessagePage implements OnInit {

  chat
  messages = []
  YID
  number
  fn
  mn
  name
  FID

  send(){
    let friend = []

    if(this.chat){
      this.db.collection('Chat').doc(`${this.FID}|${this.YID}`).get().subscribe(ch=>{
        friend = [...ch.data()['message']]
        friend.push({name: this.mn, chat: this.chat, id: this.YID,})
        
        this.storage.get('id').then(id=>{
          this.YID = id
          this.db.collection('Chat').doc(`${this.YID}|${this.FID}`).update({
            message: friend,
            count: +1
          })
          this.db.collection('Chat').doc(`${this.FID}|${this.YID}`).update({
            message: friend,
          }).then(()=>{
            this.chat = '';

          })
        })
      })
    }
  }

  constructor(
    private functions: FunctionsService, 
    private storage: Storage, private db: AngularFirestore, 
    private location: Location, 
    private router: Router, 
    private active: ActivatedRoute) { }

  ngOnInit() {
    this.active.params.subscribe(ID=>{
      this.FID = ID.id
      this.name = ID.name
      this.storage.get('id').then(id=>{
        this.YID = id
        this.db.collection('Chat').doc(`${this.YID}|${this.FID}`).snapshotChanges().subscribe(m=>{
          if(m.payload.exists){
            this.messages = [...m.payload.data()['message']]
            
          }
        })
      })
    })
    
  }

}
