import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-geo-fence',
  templateUrl: './geo-fence.page.html',
  styleUrls: ['./geo-fence.page.scss'],
})
export class GeoFencePage implements OnInit {

  lat
  lng
  rad
  ID
  phone
  name = []

  add(){
    this.db.collection('Location').doc(this.phone).get().subscribe(loc=>{
      this.Functions.addFence(this.ID, `${loc.data()['lat']}`, `${loc.data()['lng']}`, this.phone, this.rad)
    })
  }

  constructor(
    private Functions : FunctionsService,
    private Storage: Storage,
    private db: AngularFirestore
    ) { }

  ngOnInit() {
    this.Storage.get('id').then(id=>{
      this.ID = id
      this.db.collection('Friends').doc(this.ID).collection('Admin').doc('confirmed').snapshotChanges().subscribe(friend=>{
        if(friend.payload.exists){
          let friends = [...friend.payload.data()['number']]
          for(const f in friends){
            this.db.collection('Users').doc(friends[f]).snapshotChanges().subscribe(user=>{
              if(user.payload.exists){
                this.name.push({name: `${user.payload.data()['Firstname']} ${user.payload.data()['Lastname']}`})
              }
            })
          }
        }
      })
    })
  }

}
