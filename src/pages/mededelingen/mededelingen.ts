import { DetailPage } from './../detail/detail';
import { Functions } from './../../services/functions.service';
import Request from 'request';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'mededelingen.html'
})
export class MededelingenPage {

  items: {title: string, body: string, originalBody: string, images: any, featuredImage: any}[] = [];

  constructor(public navCtrl: NavController, public Functions: Functions, public loadingCtrl: LoadingController) {

  }

  getData(){
    // remove all item for new ones
    this.items = [];

    // prepare the loader
    let loading = this.loadingCtrl.create({
      content: 'Geduld aub...'
    });

    // show loading
    loading.present();

    // get data from WP API
    Request('https://alemofo.werkenbijalembo.sr/wp-json/wp/v2/posts?categories=65', (error, response, body) => {
      var body = JSON.parse(body);
      body.forEach((item) => {
        // list
        var bodyInput = this.Functions.stripAndDecode(item.content.rendered, '').substring(0, 80) + " ...";
        var featuredImage = this.Functions.getFeaturedImage(item.content.rendered, 'assets/img/card-header.jpg');

        // for the details page
        var originalBody = this.Functions.stripAndDecode(item.content.rendered, '<p><b><span><br><a><li><ul>');
        var images = this.Functions.getImagesFromString(item.content.rendered);
        
        // push the items to the array
        this.items.push({title: item.title.rendered, body: bodyInput, originalBody: originalBody, images: images, featuredImage: featuredImage});
      });
    });

    setTimeout(() => {
      // remove loading
      loading.dismiss();
      // show the data
      this.items = this.items;
    }, 1000);
  }

  // pull to refresh
  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1000);
  }

  openModal(item){
    // remove all item for new ones
    this.items = [];
    // open the details page
    this.navCtrl.push(DetailPage, item);
  }

  ionViewWillEnter() {
    this.getData();
  }
}
