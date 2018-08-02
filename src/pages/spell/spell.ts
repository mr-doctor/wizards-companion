import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import {SpellEditPage} from "../spell-edit/spell-edit";
import {SpellbookPage} from "../spellbook/spellbook";

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
  parentPage: SpellbookPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.model = this.navParams.data.input;
    this.parentPage = this.navParams.data.parent;
  }

  edit() {
    this.navCtrl.push(SpellEditPage, {input: this.model, parentPage: this.parentPage});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellPage');
  }

}
