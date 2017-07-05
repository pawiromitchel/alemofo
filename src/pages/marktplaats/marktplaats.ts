import { DetailPage } from './../detail/detail';
import { Functions } from './../../services/functions.service';
import Request from 'request';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the MarktplaatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-marktplaats',
  templateUrl: 'marktplaats.html',
})
export class MarktplaatsPage {

  items: {title: string, body: string, originalBody: string, images: any, featuredImage: any}[] = [];

  // prepare the loader
  loading = this.loadingCtrl.create({
    content: 'Geduld aub...'
  });

  constructor(public navCtrl: NavController, public functions: Functions, public loadingCtrl: LoadingController) {

  }

  getData(){
    // remove all item for new ones
    this.items = [];

    

    // show loading
    this.loading.present();

    // get data from WP API
    Request('https://alemofo.werkenbijalembo.sr/wp-json/wp/v2/posts?categories=71', (error, response, body) => {
      var body = JSON.parse(body);
      body.forEach((item) => {
        // list
        var bodyInput = this.functions.stripAndDecode(item.content.rendered, '').substring(0, 80) + " ...";
        var featuredImage = this.functions.getFeaturedImage(item.content.rendered, 'assets/img/card-header.jpg');

        // for the details page
        var originalBody = this.functions.stripAndDecode(item.content.rendered, '<p><b><span><br><a><li><ul>');
        var images = this.functions.getImagesFromString(item.content.rendered);
        
        // push the items to the array
        this.items.push({title: item.title.rendered, body: bodyInput, originalBody: originalBody, images: images, featuredImage: featuredImage});
      });

      setTimeout(() => {
        // remove loading
        this.loading.dismiss();
        // show the data
        this.items = this.items;
        // store the data
        localStorage.setItem("marktplaats", JSON.stringify(this.items));
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

  openModal(item){
    // remove all item for new ones
    this.items = [];
    // open the details page
    this.navCtrl.push(DetailPage, item);
  }

  ionViewDidEnter(){
    if(localStorage.getItem("marktplaats") === null && localStorage.getItem("marktplaats") != ""){
      this.getData();
    } else {
      this.items = JSON.parse(localStorage.getItem("marktplaats"));
    }
  }
}
