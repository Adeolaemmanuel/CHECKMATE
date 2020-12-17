import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { FunctionsService } from '../functions.service';
import {  MenuController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {



  constructor(private Nav: NavController, 
    private storage: Storage, 
    private auth: AngularFireAuth, 
    private alertController: AlertController, 
    private router: Router, 
    private message: AngularFireMessaging,
    private Functions: FunctionsService,
    private menuController: MenuController
    ) { }
 
  ngOnInit() {
    this.menuController.enable(false)
    this.storage.get('logged').then( prams=>{
      if(prams == true){
        //this.router.navigate(['Tabs/Tabs/Map'])
      }
    })
    
    
  }

}
