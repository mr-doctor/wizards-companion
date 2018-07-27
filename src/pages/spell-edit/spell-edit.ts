import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpellModel} from "../../providers/page/page";

/**
 * Generated class for the SpellEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spell-edit',
  templateUrl: 'spell-edit.html',
})
export class SpellEditPage {

  model: SpellModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.model = this.navParams.data.input;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellEditPage');
  }

}
