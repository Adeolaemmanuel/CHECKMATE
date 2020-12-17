import { Component, ViewChild, OnInit, ElementRef, AfterContentInit } from '@angular/core';
declare var google
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { FunctionsService } from '../functions.service';
import {  MenuController } from "@ionic/angular";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  Map
  lng : number
  lat : number
  zoom: number = 5
  self
  Friends
  style = []
  number = []
  friend = []
  ID  : any
  image
  maker = []

  pro(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.navCtrl.navigate(['/profiles',{number : value}])
  }

  refresh(event){
    this.ngOnInit() 
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  
  constructor( 
    private route: ActivatedRoute, 
    private navCtrl: Router, 
    private geolocation: Geolocation, 
    private db: AngularFirestore, 
    private Storage: Storage, 
    private storage: AngularFireStorage, 
    private alertController: AlertController,
    private Functions: FunctionsService,
    private menuController: MenuController,
    ) { }


  ngOnInit() {
    this.Storage.get('id').then(prams=>{
      this.menuController.enable(true)
      this.ID = prams
      this.Functions.getLocation(prams) 
      
      this.db.collection('Friends').doc(this.ID).collection('Admin').doc('confirmed').snapshotChanges().subscribe(data=>{
        if(data.payload.exists){
          this.number = [...data.payload.data()['number']]
          for(const n in this.number){
            //console.log(this.number[n]);
            
            this.db.collection('Location').doc(`${this.number[n]}`).snapshotChanges().subscribe(data=>{
              this.lat = parseFloat(data.payload.data()['lat'])
              this.lng = parseFloat(data.payload.data()['lng'])

              this.db.collection('Users').doc(`${this.number[n]}`).snapshotChanges().subscribe(data=>{
                //console.log(data.payload.data()['Email']+'yeah');
                
                var ProfilePicUrl = this.storage.ref('Profile/'+data.payload.data()['Email']).getDownloadURL();
                var name = `${data.payload.data()['Firstname'].charAt(0)} ${data.payload.data()['Lastname'].charAt(0)}`
                this.maker.push({
                  lat: this.lat,
                  lng: this.lng,
                  label: name,
                  draggable: true,
                  fullname: `${data.payload.data()['Firstname']} ${data.payload.data()['Lastname']}`,
                  img: ProfilePicUrl,
                  number: data.payload.data()['Phone']
                })
                //console.log(this.maker);
                
              })
            })
          }
        }else{
          (async () => {
            const alert = await this.alertController.create({
              header: 'CHECKMATE',
              subHeader: '',
              message: `Only your Location shows, Add Friends To view thier Location`,
              buttons: ['OK']
            });
            await alert.present(); 
          })()
        }
      })    
      
    })
  }

}
