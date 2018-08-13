import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import {SpellPage} from "../spell/spell";
import {SpellbookEditPage} from "../spellbook-edit/spellbook-edit";
import {SaveProvider} from "../../providers/save/save";
import {SpellImportPage} from "../spell-import/spell-import";

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
  public pageID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.model = this.navParams.data.input;
    this.pageID = this.navParams.data.pageID;
    this.model.pageID = this.pageID;
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
      buttons: [{
        text: "Create New",
        handler: () => {
          this.model.pages.push(new SpellModel("Spell "+(this.model.pages.length + 1)));
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
    this.navCtrl.push(SpellPage, {input: page});
  }

  delete(page: SpellModel) {
    console.log("Delete page " + page.name)
    let index = this.model.pages.indexOf(page, 0);
    if (index > -1) {
      this.model.pages.splice(index, 1);
    }
    // this.saver.saveSpellbook(this);
  }

  edit() {
    this.navCtrl.push(SpellbookEditPage, {inputModel: this.model, parent: this});
  }

}
