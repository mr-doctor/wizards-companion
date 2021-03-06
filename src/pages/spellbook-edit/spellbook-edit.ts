import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpellbookModel, SpellModel} from "../../providers/page/page";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.model = this.navParams.data.inputModel;
    this.nameInput = this.model.name;
  }

  save() {
    this.model.name = this.nameInput;
    for (let i = 0; i < this.model.pages.length; i++) {
      this.model.pages[i].spellbookName = String(this.nameInput);
    }
    this.navCtrl.pop();
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellbookEditPage');
  }

}
