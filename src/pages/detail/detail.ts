import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Functions } from './../../services/functions.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  title: any;
  body: any;
  images: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public functions: Functions, private photoViewer: PhotoViewer) {
  }

  openImage(image){
    this.photoViewer.show(this.functions.getWPOriginalResolution(image));
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('title');
    this.body = this.navParams.get('originalBody');
    this.images = this.navParams.get('images');
  }
}
