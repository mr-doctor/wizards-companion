import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import {SpellEditPage} from "../spell-edit/spell-edit";
import {SpellbookPage} from "../spellbook/spellbook";
import {FirebaseProvider} from "../../providers/firebase/firebase";

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
  private allowEdit: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider) {
    this.model = this.navParams.data.input;
    this.allowEdit = this.navParams.data.allowEdit;
  }

  edit() {
    this.navCtrl.push(SpellEditPage, {input: this.model});
  }
  
  upload():void {
    this.firebase.uploadSpell(this.model);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellPage');
  }

}
