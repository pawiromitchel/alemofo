import { Functions } from './../../services/functions.service';
import Request from 'request';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-over-alembo',
  templateUrl: 'over-alembo.html',
})
export class OverAlemboPage {

  content: any;

  // prepare the loader
  loading = this.loadingCtrl.create({
    content: 'Geduld aub...'
  });

  constructor(public navCtrl: NavController, public functions: Functions, public loadingCtrl: LoadingController) {

  }

getData(){

    // show loading
    this.loading.present();

    // get data from WP API
    Request('https://alemofo.werkenbijalembo.sr/wp-json/wp/v2/pages?slug=missievisie', (error, response, body) => {
      var body = JSON.parse(body);
      body.forEach((item) => {
        // for the details page
        this.content = this.functions.stripAndDecode(item.content.rendered, '<p><b><span><br><a><li><ul>');
      });

      setTimeout(() => {
        // remove loading
        this.loading.dismiss();
        // show the data
        this.content = this.content;
        // store data
        localStorage.setItem("over-alembo", this.content);
      }, 1000);
    });
  }

  // pull to refresh
  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1000);
  }

  ionViewDidEnter(){
    if(localStorage.getItem("over-alembo") === null && localStorage.getItem("over-alembo") != ""){
      this.getData();
    } else {
      this.content = localStorage.getItem("over-alembo");
    }
  }
}
