import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { FunctionsService } from './functions.service';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  ID : string
  Plan
  email
  public appPages = [
    {
      title: 'Dashboard',
      url: 'Tabs',
      icon: 'HOME'
    },
    {
      title: 'Maps',
      url: 'Tabs/Tabs/Map',
      icon: 'map'
    },
    {
      title: 'Notifications',
      url: 'Notification',
      icon: 'notifications'
    },
    {
      title: 'Friends',
      url:  'Tabs/Tabs/Friends',
      icon: 'people'
    },
    {
      title: 'Upgrade',
      url:  'Pay',
      icon: 'card'
    },
    {
      title: 'About',
      url:  'about',
      icon: 'information'
    },
  ];
  
  FriendsCount = []
  Notifications = []
  month = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec']
  Date = new Date()

  logout(){
    this.Storage.clear();
    this.router.navigateByUrl('Home')
  }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private Storage: Storage,
    private db: AngularFirestore,
    private backgroundMode: BackgroundMode,
    private Functions: FunctionsService,
    public foregroundService: ForegroundService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.foregroundService.start('GPS Running', 'Background Service', 'drawable/fsicon');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.Storage.get('id').then(data=>{
        if(data){
          this.Functions.panic(data)
          this.Functions.Fence(data)
        }
      })
      this.Storage.get('logged').then( prams=>{
        if(prams == true){
          this.router.navigate(['Tabs/Tabs/Map'])
          this.backgroundMode.enable();
        }
      })
    });
  }

  ngOnInit() {
    this.Storage.get('id').then(prams=>{
      if(prams){
        this.ID = prams
      this.Functions.panic(this.ID)
      this.db.collection('Friends').doc(this.ID).collection('Admin').doc('confirmed').snapshotChanges().subscribe(confirmed=>{
        if(confirmed.payload.exists){
          this.FriendsCount = [...confirmed.payload.data()['number']]
          //console.log(this.FriendsCount);
        }
        this.db.collection('Users').doc(this.ID).snapshotChanges().subscribe(pay=>{
          //for payed users countdown to next pay
          if(pay.payload.exists){
            if(pay.payload.data()['nextPay'] == `${this.month[this.Date.getMonth()]} ${this.Date.getDay()}, ${this.Date.getFullYear()}`){
              this.db.collection('Users').doc(this.ID).update({Plan: 'Basic'})
            }
          }
        })
      })
       

      this.db.collection('Notifications').doc(this.ID).collection('Admin').doc('new').snapshotChanges().subscribe(not=>{
        if(not.payload.exists){
          this.Notifications = [...not.payload.data()['new']]
        }
      })
      }
    })

  }
}
