import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.page.html',
  styleUrls: ['./unknown.page.scss'],
})
export class UnknownPage implements OnInit {

  Numbers = []
  Search
  lat: number
  lng: number
  zoom: number = 5

  map(){
    if(this.Numbers.indexOf(this.Search) == -1){
      (async () => {
        const alert = await this.alertController.create({
          header: 'CHECKMATE',
          subHeader: 'Inavlid Number',
          message: `This user isn't using this app please invite`,
          buttons: ['OK']
        });
        await alert.present(); 
      })()
    }else{
      this.db.collection('Location').doc(this.Search).get().subscribe(d=>{
        this.lat = d.data()['lat']
        this.lng = d.data()['lng']
      })
    }
  }

  constructor(private db: AngularFirestore, private alertController: AlertController) { }

  ngOnInit() {
    this.db.collection('Numbers').doc('Admin').get().subscribe(data=>{
      this.Numbers = data.data()['number']
    })
  }

}
