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

  constructor(public navCtrl: NavController, public pageProvider: PageProvider, public alertCtrl: AlertController) {

  }

  jumpToSpellbook(page: SpellbookModel) {
    this.navCtrl.push(SpellbookPage, {input: page});
  }

}

