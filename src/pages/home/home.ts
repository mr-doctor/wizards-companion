import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {SpellbookPage} from "../spellbook/spellbook";
import {PageProvider, SpellbookModel} from "../../providers/page/page";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, public pageProvider: PageProvider) {

  }

  jumpToSpellbook(page: SpellbookModel) {
    this.navCtrl.push(SpellbookPage, {input: page});
  }

  delete(page: SpellbookModel) {
    let index = this.pageProvider.pages.indexOf(page, 0);
    if (index > -1) {
      this.pageProvider.pages.splice(index, 1);
    }
  }

}

