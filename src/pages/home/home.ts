import { Component } from '@angular/core';
import {AlertController, NavController, reorderArray} from 'ionic-angular';
import {SpellbookPage} from "../spellbook/spellbook";
import {PageProvider, SpellbookModel, SpellModel} from "../../providers/page/page";
import {SpellEditPage} from "../spell-edit/spell-edit";
import {SpellImportPage} from "../spell-import/spell-import";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pageID: number = 0;

  constructor(public navCtrl: NavController, public pageProvider: PageProvider, public alertCtrl: AlertController) {

  }

  jumpToSpellbook(page: SpellbookModel) {
    this.navCtrl.push(SpellbookPage, {input: page, pageID: this.pageID++});
  }

  delete(page: SpellbookModel) {

    this.alertCtrl.create({
      title: "Deleting " + page.name,
      subTitle: "Are you sure that you want to delete this forever?",
      cssClass: "deleteAlert",
      buttons: [{
        text: "Cancel",
      },{
          text: "Delete",
          handler: () => {
            let index = this.pageProvider.pages.indexOf(page, 0);
            if (index > -1) {
              this.pageProvider.pages.splice(index, 1);
            }
          }
        }]
    }).present();
  }

  reorderItems(indexes) {
    this.pageProvider.pages = reorderArray(this.pageProvider.pages, indexes);
  }

}

