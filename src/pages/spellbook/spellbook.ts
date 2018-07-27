import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import {SpellPage} from "../spell/spell";

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

  model: SpellbookModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.model = this.navParams.data.input;
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad SpellbookPage');
  }

  newSpell() {
    this.model.pages.push(new SpellModel("Spell "+(this.model.currentPage++)));
  }

  jumpToSpell(page: SpellModel) {
    this.navCtrl.push(SpellPage, {input: page});
  }

}
