import { MededelingenPage } from './../mededelingen/mededelingen';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import Request from 'request';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'menu');
  }

  doLogin(username: string, password: string, string: string){
    let alert = this.alertCtrl.create({
      title: 'Mislukt',
      subTitle: 'Ongeldige gebruikersnaam en/of wachtwoord',
      buttons: ['Sluiten']
    });

    let loader = this.loadingCtrl.create({
      content: string,
      duration: 2000
    });

    Request.post("https://alemofo.werkenbijalembo.sr/custom_api_auth/authentication.php", {form: {
      username: username,
      password: password
    }}, (error, response, body) => {
      if(error){
        localStorage.clear();
        alert.present();
      }
      if(body){
        loader.present();
        loader.onDidDismiss(() => {
          // save auth
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          this.navCtrl.setRoot(MededelingenPage);
          this.menuCtrl.enable(true, 'menu');
        });
      }
    });
  }

  // when login button is pressed
  login(){
    this.doLogin(this.username, this.password, "Geduld aub...");
  }

  ionViewWillEnter() {
    if(this.username !== null && this.password !== null){
      this.doLogin(localStorage.getItem('username'), localStorage.getItem('password'), "Welkom terug ...");
    }
  }
}
