import { MarktplaatsPage } from './../pages/marktplaats/marktplaats';
import { OverAlemboPage } from './../pages/over-alembo/over-alembo';
import { NieuwsPage } from './../pages/nieuws/nieuws';
import { DetailPage } from './../pages/detail/detail';
import { Functions } from './../services/functions.service';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { MyApp } from './app.component';
import { MededelingenPage } from '../pages/mededelingen/mededelingen';

@NgModule({
  declarations: [
    MyApp,
    MededelingenPage,
    LoginPage,
    DetailPage,
    NieuwsPage,
    OverAlemboPage,
    MarktplaatsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MededelingenPage,
    LoginPage,
    DetailPage,
    NieuwsPage,
    OverAlemboPage,
    MarktplaatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Functions,
    PhotoViewer
  ]
})
export class AppModule {}
