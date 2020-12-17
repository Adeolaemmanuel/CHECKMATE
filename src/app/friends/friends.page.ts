import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Contacts} from '@ionic-native/contacts/ngx';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { firestore } from 'firebase/app'
import { SMS } from '@ionic-native/sms/ngx';
import { Platform, ToastController, IonRouterOutlet} from '@ionic/angular';
import { map } from 'rxjs/operators';
import { FunctionsService } from '../functions.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  Search : string
  ID
  Numbers = []
  Recieved = []
  recieved = []
  Sent = []
  sent = []
  Confirmed = []
  confirmed = []
  index
  ref = this.db.createId()
  Spictures = []
  Rpictures = []
  Cpictures = []
  Yplan
  name
  Ycount
  segmentModel = 'friends'
  Fcount
  Fplan

  test = []

  back() {
    this.location.back();
  }

  initializeItems() {
    this.contacts.pickContact().then(c=>{
      const number = c.phoneNumbers[0].value
      number.replace(' ','')
      this.Search = number
    })
  }
  num(ev: any){
    this.initializeItems();
  }
  search(){     
      this.db.collection('Users').doc(this.ID).get().subscribe(data=>{
        this.Yplan = data.data()['Plan']
        this.Ycount = data.data()['FriendsCount']
      })
      this.db.collection('Users').doc(this.Search).get().subscribe(data=>{
        this.Fplan = data.data()['Plan']
        this.Fcount = data.data()['FriendsCount']
        this.name = `${data.data()['Firstname']} ${data.data()['Lastname']}`
      })

    if(this.Numbers.indexOf(this.Search) == -1){
      (async () => {
        const alert = await this.alertController.create({
          header: 'CHECKMATE',
          subHeader: 'Inavlid Number',
          message: `This user isn't using this app please invite`,
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.sms.hasPermission()
                this.sms.send(`${this.Search}`, `${this.name} has invited you to join Checkmait`)
              }
            }
          ]
        });
        await alert.present(); 
      })()
    }else if(this.Search == this.ID){
      (async () => {
        const alert = await this.alertController.create({
          header: 'CHECKMATE',
          subHeader: '',
          message: `You can't add yourself`,
          buttons: ['OK']
        });
        await alert.present(); 
      })()
    }else if(this.Search.includes('+')){
      let toast = this.toastCtrl.create({
        message: `Remove contry code to add number`,
        duration: 3000,
        position: 'top',
        color : 'dark'
      }).then((toast)=>{
        toast.present();
      })
    } else{
      if(this.Yplan == 'Basic'  || this.Fplan == 'Basic'){
        if(this.Ycount == 2 ||  this.Fcount == 2){
          (async () => {
            const alert = await this.alertController.create({
              header: 'CHECKMATE',
              subHeader: '',
              message: `This Basic user`,
              buttons: ['OK']
            });
            await alert.present(); 
          })()
        }else if(this.Ycount != 2 ||  this.Fcount != 2){
          this.db.collection('Friends').doc(this.ID).collection('Admin').doc('sent').update({
            number: firestore.FieldValue.arrayUnion(this.Search)
          }).then(()=>{
            this.db.collection('Users').doc(this.ID).update({
              FriendsCount: this.Ycount +1
            })
          })
          this.db.collection('Friends').doc(this.Search).collection('Admin').doc('recieved').update({
            number: firestore.FieldValue.arrayUnion(this.ID)
          }).then(()=>{
            this.db.collection('Users').doc(this.Search).update({
              FriendsCount: this.Fcount +1
            })
            this.db.collection('Users').doc(this.Search).get().subscribe(data=>{
              this.Spictures.push(this.storage.ref('Profile/'+data.data()['Email']).getDownloadURL())
            })
            this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('new').update({
              new : firestore.FieldValue.arrayUnion(`New friends request from ${this.name}`)
            })
    
            this.Search = ''
            let toast = this.toastCtrl.create({
              message: `${this.name} was added successfully`,
              duration: 3000,
              position: 'top',
              color : 'dark'
            }).then((toast)=>{
              toast.present();
            })
          })
        }
    } 

    if(this.Yplan == 'Standard' || this.Fplan == 'Standard'){
      if(this.Ycount == 15 ||  this.Fcount == 15){
        (async () => {
          const alert = await this.alertController.create({
            header: 'CHECKMATE',
            subHeader: '',
            message: `This Standard user`,
            buttons: ['OK']
          });
          await alert.present(); 
        })()
      }else if(this.Ycount != 15 ||  this.Fcount != 15){
        this.db.collection('Friends').doc(this.ID).collection('Admin').doc('sent').update({
          number: firestore.FieldValue.arrayUnion(this.Search)
        }).then(()=>{
          this.db.collection('Users').doc(this.ID).update({
            'FriendsCount': this.Ycount +1
          })
        })
        this.db.collection('Friends').doc(this.Search).collection('Admin').doc('recieved').update({
          number: firestore.FieldValue.arrayUnion(this.ID)
        }).then(()=>{
          this.db.collection('Users').doc(this.Search).update({
            'FriendsCount': this.Fcount +1
          });
          this.Search = ''
          this.db.collection('Users').doc(this.Search).get().subscribe(data=>{
            this.Spictures.push(this.storage.ref('Profile/'+data.data()['Email']).getDownloadURL())
          })
          this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('new').update({
            new : firestore.FieldValue.arrayUnion(`New friends request from ${this.name}`)
          })

          let toast = this.toastCtrl.create({
            message: `${this.name} was added successfully`,
            duration: 3000,
            position: 'top',
            color: 'danger'
          }).then((toast)=>{
            toast.present();
          })
        })
      }
    }

    if(this.Yplan == 'Premium'  || this.Fplan == 'Premium'){
      if(this.Ycount == 30 ||  this.Fcount == 30){
          (async () => {
            const alert = await this.alertController.create({
              header: 'CHECKMATE',
              subHeader: '',
              message: `You have reached the limit of friends contact us form more details`,
              buttons: ['OK']
            });
            await alert.present(); 
          })()
      }else if(this.Ycount != 30 ||  this.Fcount != 30){
        this.db.collection('Friends').doc(this.ID).collection('Admin').doc('sent').update({
          number: firestore.FieldValue.arrayUnion(this.Search)
        }).then(()=>{
          this.db.collection('Users').doc(this.ID).update({
            'FriendsCount': this.Ycount +1
          })
        })
        this.db.collection('Friends').doc(this.Search).collection('Admin').doc('recieved').update({
          number: firestore.FieldValue.arrayUnion(this.ID)
        }).then(()=>{
          this.db.collection('Users').doc(this.Search).update({
            'FriendsCount': this.Fcount +1
          })
          this.Search = ''
          this.db.collection('Users').doc(this.Search).get().subscribe(data=>{
            this.Spictures.push(this.storage.ref('Profile/'+data.data()['Email']).getDownloadURL())
          })
          this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('new').update({
            new : firestore.FieldValue.arrayUnion(`New friends request from ${this.name}`)
          })


          let toast = this.toastCtrl.create({
            message: `${this.name} was added successfully`,
            duration: 3000,
            position: 'top',
            color: 'danger'
          }).then((toast)=>{
            toast.present();
          })
        })
      }
    }
    }
    
  }

  Ans(event){    
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    const getId = this.Recieved.indexOf(value)
    this.index = this.recieved[getId]
    this.recieved.splice(getId,1)
    this.Recieved.splice(getId,1)
    var sId = this.sent.indexOf(this.index,1)
    this.Sent.splice(sId,1)
    this.sent.splice(sId,1)
    

    this.db.collection('Friends').doc(this.index).collection('Admin').doc('sent').update({
      number: this.sent
    })
    this.db.collection('Friends').doc(this.ID).collection('Admin').doc('recieved').update({
      number: this.recieved
    })

    this.db.collection('Friends').doc(this.ID).collection('Admin').doc('confirmed').update({
      number: firestore.FieldValue.arrayUnion(this.index)
    })

    this.db.collection('Friends').doc(`${this.index}`).collection('Admin').doc('recieved').get().subscribe(data=>{
      const recieved = [...data.data().number]
      var index = recieved.indexOf(this.ID)
      recieved.splice(index,1) 
      
      this.db.collection('Friends').doc(`${this.index}`).collection('Admin').doc('recieved').update({
        number : recieved
      })
      this.db.collection('Friends').doc(`${this.index}`).collection('Admin').doc('confirmed').update({
        number : firestore.FieldValue.arrayUnion(this.ID)
      }).then(()=>{
        this.Spictures.splice(index,1)
        let toast = this.toastCtrl.create({
          message: `${this.name} request as been Accepted!`,
          duration: 3000,
          position: 'top',
          color: 'dark'
        }).then((toast)=>{
          toast.present();
        })
        this.functions.notifications(`${this.name} request as been Accepted!`)
      })
    })
  }

  Rdel(event){
    let User = {}
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    const getId = this.Recieved.indexOf(value)
    this.index = this.recieved[getId]
    this.db.collection('Users').doc(this.ID).get().subscribe(data=>{
      this.Ycount = data.data()['FriendsCount']
      var recieved=[...this.recieved]
      var index= recieved.indexOf(this.index)
      recieved.splice(index,1)
      this.recieved.splice(index,1)
      this.Recieved.splice(index,1)
      this.Confirmed.splice(index,1)
      this.db.collection('Friends').doc(this.ID).collection('Admin').doc('recieved').update({
        number: recieved
      }).then(()=>{
        this.db.collection('Users').doc(this.ID).update({
          FriendsCount : this.Ycount -1
        })
        this.confirmed.splice(index,1)
        this.Spictures.splice(index,1)
      })

      
    })

    this.db.collection('Users').doc(this.index).get().subscribe(data=>{
      this.Fcount = data.data()['FriendsCount']
      
      this.db.collection('Friends').doc(this.index).collection('Admin').doc('sent').get().subscribe(data=>{
        if(data.exists){
          let sent = [...data.data().number]
          var index = sent.indexOf(this.ID)
          if(index == -1){}
          else{
            sent.splice(index,1)
            this.db.collection('Friends').doc(this.index).collection('Admin').doc('sent').update({
              number: sent
            }).then(()=>{
              this.db.collection('Users').doc(this.index).update({
                FriendsCount : this.Fcount -1
              })
              let toast = this.toastCtrl.create({
                message: `${value} was deleted successfully`,
                duration: 3000,
                position: 'top',
                color: 'dark'
              }).then((toast)=>{
                toast.present();
              })
            })
          }
        }
      })
    })
  }

  Sdel(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    const getId = this.Sent.indexOf(value)
    this.index = this.sent[getId]
  
    this.db.collection('Users').doc(this.ID).get().subscribe(data=>{
      this.Ycount = data.data()['FriendsCount']
      var sent=[...this.sent]
      var index= sent.indexOf(this.index)
      this.sent.splice(index,1)
      sent.splice(index,1)
      this.Sent.splice(index,1)
      this.db.collection('Friends').doc(this.ID).collection('Admin').doc('sent').update({
        number: sent
      }).then(()=>{
        this.db.collection('Users').doc(this.ID).update({
          FriendsCount : this.Ycount -1
        })
        
      })
      
    })

    this.db.collection('Users').doc(this.index).get().subscribe(data=>{
      this.Fcount = data.data()['FriendsCount']
      this.db.collection('Friends').doc(this.index).collection('Admin').doc('recieved').get().subscribe(data=>{
        if(data.exists){
          let recieved = [...data.data().number]
          var index = recieved.indexOf(this.ID)
          console.log(index);
          
          if(index == -1){}
          else{
            recieved.splice(index,1)
            console.log(recieved);
            
            this.db.collection('Friends').doc(this.index).collection('Admin').doc('recieved').update({
              number: recieved
            }).then(()=>{
              this.db.collection('Users').doc(this.index).update({
                FriendsCount : this.Fcount -1
              })
              let toast = this.toastCtrl.create({
                message: `${value} was deleted successfully`,
                duration: 3000,
                position: 'top',
                color: 'dark'
              }).then((toast)=>{
                toast.present();
              })
            })
          }
        }
      })

      this.db.collection('Friends').doc(this.index).collection('Admin').doc('confirmed').get().subscribe(data=>{
        if(data.exists){
          let confirmed = [...data.data().number]
          var index = confirmed.indexOf(this.ID)
          if(index == -1){}
          else{
            confirmed.splice(index,1)
            this.db.collection('Friends').doc(this.index).collection('Admin').doc('confirmed').update({
              number: confirmed
            }).then(()=>{
              this.db.collection('Users').doc(this.index).update({
                FriendsCount : this.Fcount -1
              })
            })
          }
        }
      })
    })
  }
  
  Cdel(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    const getId = this.Confirmed.indexOf(value)
    this.index = this.confirmed[getId]
  
    this.db.collection('Users').doc(this.ID).get().subscribe(data=>{
      this.Ycount = data.data()['FriendsCount']
      var confirmed=[...this.confirmed]
      var index= confirmed.indexOf(this.index)
      confirmed.splice(index,1)
      this.confirmed.splice(index,1)
      this.Confirmed.splice(index,1)
      this.db.collection('Friends').doc(this.ID).collection('Admin').doc('confirmed').update({
        number: confirmed
      }).then(()=>{
        this.db.collection('Users').doc(this.ID).update({
          FriendsCount : this.Ycount -1
        })
      })
      
    })

    this.db.collection('Users').doc(this.index).get().subscribe(data=>{
      this.Fcount = data.data()['FriendsCount']

      this.db.collection('Friends').doc(this.index).collection('Admin').doc('confirmed').get().subscribe(data=>{
        if(data.exists){
          let confirmed = [...data.data().number]
          var index = confirmed.indexOf(this.ID)
          if(index == -1){}
          else{
            confirmed.splice(index,1)
            this.db.collection('Friends').doc(this.index).collection('Admin').doc('confirmed').update({
              number: confirmed
            }).then(()=>{
              this.db.collection('Users').doc(this.index).update({
                FriendsCount : this.Fcount -1
              })
              this.db.collection('Chat').doc(`${this.index}|${this.ID}`).delete()
              let toast = this.toastCtrl.create({
                message: `${value} was deleted successfully`,
                duration: 3000,
                position: 'top',
                color: 'dark'
              }).then((toast)=>{
                toast.present();
              })
            })
          }
        }
      })
    })
  }

  pro(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var number = this.confirmed[value]
    this.navCtrl.navigate(['/profiles',{number : number}])
  }

  refresh(event){
    this.confirmed = []
    this.Confirmed = []
    this.Sent = []
    this.sent = []
    this.recieved = []
    this.Recieved = []
    this.ngOnInit() 
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  segmentChanged(event){}
  
  constructor(private sms: SMS, private toastCtrl: ToastController, private platform: Platform, private location: Location, private route: ActivatedRoute, private auth: AngularFireAuth, private alertController: AlertController, private navCtrl: Router, private db: AngularFirestore, private Storage: Storage, private storage: AngularFireStorage, private Functions: AngularFireFunctions, private contacts: Contacts, private functions: FunctionsService ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.location.back()
    });
    
  }

  ngOnInit() {
    
      this.Storage.get('id').then(prams=>{
        this.ID = prams

        this.db.collection('Friends').doc(this.ID).collection('Admin').doc('sent').snapshotChanges().subscribe(sent=>{
          if(sent){
            this.sent = [...sent.payload.data()['number']]

            for(const s in this.sent){
              this.db.collection('Users').doc(this.sent[s]).get().subscribe(data=>{
                this.name = `${data.data()['Firstname']} ${data.data()['Lastname']}`
                this.Spictures.push(this.storage.ref('Profile/'+data.data()['Email']).getDownloadURL())
                this.Sent.push(this.name)
              })
            }
          }
        })
        this.db.collection('Friends').doc(this.ID).collection('Admin').doc('recieved').snapshotChanges().subscribe(recieved=>{
          
          if(recieved){
            this.recieved = [...recieved.payload.data()['number']]
            for(const r in this.recieved){
              this.db.collection('Users').doc(this.recieved[r]).get().subscribe(data=>{
                this.name = `${data.data()['Firstname']} ${data.data()['Lastname']}`
                this.Rpictures.push(this.storage.ref('Profile/'+data.data()['Email']).getDownloadURL())
                this.Recieved.push(this.name)
                if(recieved.type = 'added'){
                  let toast = this.toastCtrl.create({
                    message: `New friend request from ${this.name}`,
                    duration: 3000,
                    position: 'top',
                    color: 'dark'
                  }).then((toast)=>{
                    toast.present();
                  })
                }
              })
            }
          }
        })
        this.db.collection('Friends').doc(this.ID).collection('Admin').doc('confirmed').get().subscribe(confirmed=>{
          if(confirmed.exists){
             this.confirmed = [...confirmed.data()['number']]
            for(const c in this.confirmed){
              this.db.collection('Users').doc(this.confirmed[c]).get().subscribe(data=>{
                this.name = `${data.data()['Firstname']} ${data.data()['Lastname']}`
                this.Cpictures.push(this.storage.ref('Profile/'+data.data()['Email']).getDownloadURL())
                this.Confirmed.push(this.name)
                this.functions.notifications(`${this.name} answered your friend request`)
              })
            }
          }
        })
         
      })
      console.log(this.Confirmed);
      console.log(this.confirmed);
      
      this.db.collection('Numbers').doc('Admin').snapshotChanges().subscribe(data=>{
        this.Numbers = data.payload.data()['number']
      })

  }


}
