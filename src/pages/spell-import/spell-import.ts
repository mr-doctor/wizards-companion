import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {SpellbookModel, SpellModel} from "../../providers/page/page";

@IonicPage()
@Component({
  selector: 'page-spell-import',
  templateUrl: 'spell-import.html',
})
export class SpellImportPage {

  model: SpellbookModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider) {
    this.model = new SpellbookModel("Import Spell");
    this.model.pages = this.firebase.downloadAllSpells();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellImportPage');
  }

  import(spell: SpellModel) {
    console.log("Importing " + spell.name);
  }

}
