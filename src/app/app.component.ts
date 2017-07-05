import { MarktplaatsPage } from './../pages/marktplaats/marktplaats';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MededelingenPage } from '../pages/mededelingen/mededelingen';
import { OverAlemboPage } from './../pages/over-alembo/over-alembo';
import { NieuwsPage } from './../pages/nieuws/nieuws';
import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('menu') NavController: NavController;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openMededelingen(){
    this.NavController.setRoot(MededelingenPage);
  }

  openNieuws(){
    this.NavController.setRoot(NieuwsPage);
  }

  openMarktplaats(){
    this.NavController.setRoot(MarktplaatsPage);
  }

  openOverAlembo(){
    this.NavController.setRoot(OverAlemboPage);
  }
}