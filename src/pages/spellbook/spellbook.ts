import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SpellbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spellbook',
  templateUrl: 'spellbook.html',
})
export class SpellbookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellbookPage');
  }

  sayName() {
    var input = this.navParams.data.input;
    let alert = this.alertCtrl.create({
      title: 'Your name',
      subTitle: "Your name is " + input,
      buttons: ['Thanks!']
    });
    alert.present();
  }

}
