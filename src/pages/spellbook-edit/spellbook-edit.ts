import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpellbookModel} from "../../providers/page/page";
import {SaveProvider} from "../../providers/save/save";

/**
 * Generated class for the SpellbookEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spellbook-edit',
  templateUrl: 'spellbook-edit.html',
})
export class SpellbookEditPage {

  model: SpellbookModel;
  nameInput: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public saver: SaveProvider) {
    this.model = this.navParams.data.inputModel;
  }

  save() {
    this.model.name = this.nameInput;
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellbookEditPage');
  }

}
