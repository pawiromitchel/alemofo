import { ItemsService } from './../../services/items.service';
import Request from 'request';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: {title: string, body: string}[] = [];
  itemTitle: any = "Hier komt de value";

  constructor(public navCtrl: NavController, private ItemsService: ItemsService) {

  }

  ionViewWillEnter() {
    Request('https://alemofo.werkenbijalembo.sr/wp-json/wp/v2/posts?categories=65', (error, response, body) => {
      var body = JSON.parse(body);
      body.forEach((item) => {
        var itemBody = item.content.rendered.replace(/\<(?!).*?\>/g, "");
        this.items.push({title: item.title.rendered, body: itemBody});
      });
    });

    setTimeout(() => {
        this.items = this.items;
    }, 500);
  }

  readMore(){
    alert("Clicked!");
  }
}
