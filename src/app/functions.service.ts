import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Geolocation,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { firestore } from 'firebase/app'
import { Geofence } from '@ionic-native/geofence/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AngularFireFunctions } from '@angular/fire/functions';



@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  toastAlert(message){
    let toast = this.toast.create({
      message: `${message}`,
      duration: 3000,
      position: 'top',
      color : 'dark'
    }).then((toast)=>{
      toast.present();
    })
  }

  async bigAlert(message){
    let alert = await this.alert.create({
      header: 'Checkmate',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
    await alert.present()
  }


  getLocation(ID){
    setInterval(()=>{
      this.geolocation.getCurrentPosition().then((resp)=>{
        this.db.collection('Location').doc(ID).set({
          lng: parseFloat(resp.coords.longitude.toFixed(7)),
          lat: parseFloat(resp.coords.latitude.toFixed(7))
        })
      })
    },6000)


  }

  notifications(data){
    this.localNotifications.schedule({
      id: 1,
      title: 'Checkmait',
      text: `${data}`,
      sound: 'file://sound.mp3',
      data: { secret: 'Neutron@360' },
      led: 'FF0000'
    });
  }


  PANIC(ID){ 
    this.db.collection('Panic').doc(ID).get().subscribe(panic=>{
      if(panic.exists){
        let Panic = panic.data()['panic']
        this.db.collection('Panic').doc(ID).update({panic: Panic + 1})
        this.panic(ID)
      }else{
        this.db.collection('Panic').doc(ID).set({panic: 1})
        this.panic(ID)
      }
      
    })
    setTimeout(()=>{
      this.db.collection('Panic').doc(ID).update({panic: 0})
    },10000)
  }

  panic(id){
    this.db.collection('Friends').doc(id).collection('Admin').doc('confirmed').snapshotChanges().subscribe(panic=>{
      var number = [...panic.payload.data()['number']]
      for(var n in number){
        this.db.collection('Panic').doc(number[n]).snapshotChanges().subscribe(num=>{
          this.db.collection('Users').doc(id).get().subscribe(name=>{
            if(num.payload.data()['panic'] > 0 && number.indexOf(id) == -1){
              this.vibration.vibrate(6000)
              this.vibration.vibrate([6000,1000,6000]);
              var nam = `${name.data()['Firstname']} ${name.data()['Lastname']}`
              if(panic.type == 'added'){
                this.notifications(`${nam} needs your URGENT ATTENTION`)
                this.bigAlert(`${nam} needs your URGENT ATTENTION`)
              }
            }
          })
        })
      }

    })
  }


  Fence(ID){
    var user
    this.db.collection('Friends').doc(ID).collection('Admin').doc('confirmed').snapshotChanges().subscribe(friend=>{
      if(friend.payload.exists){
        let friends = [...friend.payload.data()['number']]
        for(const f in friends){
          this.db.collection('Users').doc(`${friends[f]}`).snapshotChanges().subscribe(name=>{
            this.vibration.vibrate(2000)
            this.vibration.vibrate([2000,1000,2000]);
            user = `${name.payload.data()['Firstname']} ${name.payload.data()['Lastname']}`
          })
          this.db.collection('Fence').doc(`${ID}`).collection('Admin').doc(friends[f]).snapshotChanges().subscribe(fen=>{
            let fence = {
              id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
              latitude:       fen.payload.data()['lat'], //center of geofence radius
              longitude:      fen.payload.data()['lng'],
              radius:         fen.payload.data()['rad'], //radius to edge of geofence in meters
              transitionType: 3, //see 'Transition Types' below
              notification: { //notification settings
              id: 1, //any unique ID
              text: `${this.notifications(`${user} is out of your GeoFence`)}`, //notification body
            }
            }
          })
        }
      }
    })

    this.fence.initialize().then(
      // resolved promise does not return a value
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )
  }

  addFence(ID, lat, lng, phone, rad){
    this.db.collection('Friends').doc(ID).collection('Admin').doc('confirmed').snapshotChanges().subscribe(con=>{
      if(con.payload.exists){
        let confirmed = [...con.payload.data()['number']]
        let check = confirmed.indexOf(phone)
        
        if( check != -1){
          this.db.collection('Fence').doc(`${ID}`).collection('Admin').doc(phone).set({
            lat: lat,
            lng: lng,
            rad: rad
          }).then(()=>{
            this.db.collection('Users').doc(ID).snapshotChanges().subscribe(user=>{
              this.toastAlert(`Geofence on ${user.payload.data()['Firstname']} ${user.payload.data()['Lastname']}`)
            })
          })
          this.Fence(ID)
        }else{
          this.bigAlert("This numebr isn't your friend or the number dosen't exist")
        }
      }
    })
  }

  constructor(
    private db: AngularFirestore,
    private geolocation: Geolocation,
    private vibration: Vibration,
    private fence: Geofence,
    private toast: ToastController,
    private alert: AlertController,
    private nativeAudio: NativeAudio,
    private localNotifications: LocalNotifications,
    private fns: AngularFireFunctions
  ) { }

}
