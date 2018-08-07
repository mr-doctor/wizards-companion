import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import {FirebaseProvider} from "../../providers/firebase/firebase";

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

  nameInput: String = "";
  castTimeInput: String = "";
  range: String = "Melee";
  dice: number = 0;
  diceType: String = "";
  effectType: String = "";
  desc: String = "";

  model: SpellModel;
  extraEffect: number;
  durationInput: number;
  durationType: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider) {

    this.model = this.navParams.data.input;
    this.nameInput = this.model.name;
    this.castTimeInput = this.model.castTime;
    this.range = (this.model.range == "0") ? "Melee" : this.model.range;
    this.dice = this.model.dice;
    this.diceType = this.model.diceType;
    this.effectType = this.model.effectType;
    this.extraEffect = this.model.extraEffect;
    this.desc = this.model.desc;
    this.durationInput = this.model.duration;
    this.durationType = this.model.durationType;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellEditPage');
  }

  save() {
    this.model.name = this.nameInput;
    this.model.castTime = this.castTimeInput;
    this.model.range = (this.range == "0") ? "Melee" : this.range;
    this.model.dice = this.dice;
    this.model.diceType = this.diceType;
    this.model.extraEffect = this.extraEffect;
    this.model.effectType = this.effectType;
    this.model.desc = this.desc;
    this.model.duration = this.durationInput;

    if (this.durationInput == 0) {
      this.model.durationType = "Instantaneous";
    } else if (this.durationInput == 1) {
      console.log(this.durationInput);
      this.model.durationType = this.durationType.replace(/s+$/, "");
    } else {
      this.model.durationType = this.durationType;
    }
    this.firebase.uploadSpell(this.model);
    this.navCtrl.pop();
  }

  back() {
    this.navCtrl.pop();
  }
}
