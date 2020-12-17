import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { AgmCoreModule } from '@agm/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Geofence } from '@ionic-native/geofence/ngx';
import { Angular4PaystackModule } from 'angular4-paystack';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SMS } from '@ionic-native/sms/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    IonicModule.forRoot(),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8LIhgvlYbX89FYSOLfM-z8MkuIwoUeYE'
    }),
    Angular4PaystackModule.forRoot('pk_live_246eb0b650b154157de704a228601')
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: BUCKET, useValue: 'hopeful-machine-272310.appspot.com' },
    Geolocation,
    Contacts,
    BackgroundMode,
    Vibration,
    Geofence,
    NativeAudio,
    LocalNotifications,
    SMS,
    ForegroundService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
