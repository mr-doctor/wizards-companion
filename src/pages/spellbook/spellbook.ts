import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, reorderArray} from 'ionic-angular';
import {SpellbookModel, SpellModel} from "../../providers/page/page";
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
  public pageID: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public firebase: FirebaseProvider,
              public toast: Toast) {
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
          console.log(this.model.name.valueOf());
          let spell = new SpellModel("Spell "+(this.model.pages.length + 1), this.model.name.valueOf());
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

  delete(page: SpellModel) {

    this.alertCtrl.create({
      title: "Deleting " + page.name,
      subTitle: "Are you sure that you want to delete this forever?",
      cssClass: "deleteAlert",
      buttons: [{
        text: "Cancel",
      },{
        text: "Delete",
        handler: () => {
          console.log("Delete page " + page.name);
          let index = this.model.pages.indexOf(page, 0);
          if (index > -1) {
            this.model.pages.splice(index, 1);
          }
        }
      }]
    }).present();
  }

  upload() {
    for (let i = 0; i < this.model.pages.length; i++) {
      this.firebase.uploadSpell(this.model.pages[i]);
    }
    this.toast.show("Uploaded " + this.model.name, "3000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );

  }

  edit() {
    this.navCtrl.push(SpellbookEditPage, {inputModel: this.model, parent: this});
  }

  reorderItems(indexes) {
    this.model.pages = reorderArray(this.model.pages, indexes);
  }

}
