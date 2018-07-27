import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpellModel} from "../../providers/page/page";
import {SpellEditPage} from "../spell-edit/spell-edit";

/**
 * Generated class for the SpellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spell',
  templateUrl: 'spell.html',
})
export class SpellPage {

  model: SpellModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.model = this.navParams.data.input;
  }

  edit() {
    this.navCtrl.push(SpellEditPage, {input: this.model});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellPage');
  }

}
