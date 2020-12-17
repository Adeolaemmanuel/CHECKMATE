import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var google
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-traffic',
  templateUrl: './traffic.page.html',
  styleUrls: ['./traffic.page.scss'],
})
export class TrafficPage implements OnInit {

  lat
  lng
  Map
  style
  trafficLayer
  maker

  back() {
    this.location.back();
  }

  @ViewChild('traffic', { static: false }) traffic;
  ngAfterContentInit(): void{
    this.Storage.get('id').then(id=>{
      this.db.collection('Location').doc(id).get().subscribe(prams=>{
        if(prams.exists){
          this.lat = parseFloat(prams.data()['lat'])
          this.lng = parseFloat(prams.data()['lng'])
          this.Map = new google.maps.Map(document.getElementById('traffic'), {
            zoom: 13,
            center: {lat: this.lat, lng: this.lng}
          });
        
          this.trafficLayer = new google.maps.TrafficLayer();
          this.trafficLayer.setMap(this.Map); 
        }
      }) 
   })
  }

  constructor(
    private location : Location, 
    private prams : ActivatedRoute, 
    private Storage: Storage, 
    private db: AngularFirestore,
    ) { }

  ngOnInit() {
    this.Storage.get('id').then(id=>{      
      this.db.collection('Location').doc(id).snapshotChanges().subscribe(prams=>{
        if(prams.payload.exists){
          this.lat = parseFloat(prams.payload.data()['lat'])
          this.lng = parseFloat(prams.payload.data()['lng'])
        }
      })
    })
  }

}
