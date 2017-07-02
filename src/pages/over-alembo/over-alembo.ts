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

  title: any;
  content: any;
  images: any;

  constructor(public navCtrl: NavController, public functions: Functions, public loadingCtrl: LoadingController) {

  }

getData(){

    // prepare the loader
    let loading = this.loadingCtrl.create({
      content: 'Geduld aub...'
    });

    // show loading
    loading.present();

    // get data from WP API
    Request('https://alemofo.werkenbijalembo.sr/wp-json/wp/v2/pages?slug=missievisie', (error, response, body) => {
      var body = JSON.parse(body);
      body.forEach((item) => {
        // for the details page
        this.content = this.functions.stripAndDecode(item.content.rendered, '<p><b><span><br><a><li><ul>');
        this.images = this.functions.getImagesFromString(item.content.rendered);
      });
    });

    setTimeout(() => {
      // remove loading
      loading.dismiss();
      // show the data
      this.content = this.content;
      this.images = this.images;
    }, 1000);
  }

  // pull to refresh
  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1000);
  }

  ionViewDidLoad() {
    this.getData();
  }

}
