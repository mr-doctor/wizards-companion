import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, reorderArray} from 'ionic-angular';
import {PageProvider, SpellbookModel, SpellModel} from "../../providers/page/page";
import {SpellPage} from "../spell/spell";
import {SpellbookEditPage} from "../spellbook-edit/spellbook-edit";
import {SpellImportPage} from "../spell-import/spell-import";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Toast} from "@ionic-native/toast";
import {SpellEditPage} from "../spell-edit/spell-edit";

@IonicPage()
@Component({
  selector: 'page-spellbook',
  templateUrl: 'spellbook.html',
})
export class SpellbookPage {

  model: SpellbookModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public pageProvider: PageProvider) {
    this.model = this.navParams.data.input;
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad SpellbookPage');
  }

  newSpell() {
    this.optionBox();
  }

  optionBox() {
    let alert = this.alertCtrl.create({
      title: "Add Spell",
      subTitle: "How do you want to add this spell?",
      cssClass: "custom-alert",
      buttons: [{
        text: "Create New",
        handler: () => {
          console.log(this.model.name.valueOf());
          // Unique ID generation from https://gist.github.com/6174/6062387
          let id : string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          let spell = new SpellModel("Spell "+(this.model.pages.length + 1), this.model.name.valueOf(), this.model.id, id);
          this.model.pages.push(spell);
          this.navCtrl.push(SpellEditPage, {input: spell});
        }
      }, {
        text: 'Import',
        handler: () => {
          console.log(this.model);
          this.navCtrl.push(SpellImportPage, {requestor: this.model});
        }
      }]
    });
    alert.present();
  }

  jumpToSpell(page: SpellModel) {
    this.navCtrl.push(SpellPage, {input: page, allowEdit: true});
  }

  edit() {
    this.navCtrl.push(SpellbookEditPage, {inputModel: this.model, parent: this});
  }

}
