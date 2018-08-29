import { Injectable } from '@angular/core';
import {AlertController, reorderArray} from "ionic-angular";
import {FirebaseProvider} from "../firebase/firebase";
import {Toast} from "@ionic-native/toast";

/*
  Generated class for the PageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PageProvider {

  spellbooks: SpellbookModel[] = [];
  // pages: SpellModel[] = [];

  constructor(private alertCtrl: AlertController,
              public firebase: FirebaseProvider,
              public toast: Toast) {
    console.log('Hello PageProvider Provider');
  }

  newSpellbook() {
    // Unique ID generation from https://gist.github.com/6174/6062387
    let id : string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.spellbooks.push(new SpellbookModel("Spellbook "+(this.spellbooks.length + 1), id));
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
          let index = this.spellbooks.indexOf(page, 0);
          if (index > -1) {
            this.spellbooks.splice(index, 1);
          }
        }
      }]
    }).present();
  }
  
  upload(model: SpellbookModel) {
    for (let i = 0; i < model.pages.length; i++) {
      this.firebase.uploadSpell(model.pages[i]);
    }
    this.toast.show("Uploaded " + model.name, "3000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
    
  }
  
  reorderItems(indexes) {
    this.spellbooks = reorderArray(this.spellbooks, indexes);
  }
}


export class SpellbookModel {

  pages: SpellModel[] = [];

  constructor(public name: String, public id: string) {

  }
}

export class SpellModel {
  diceType: String = "";
  castTime: String = "";
  range: String = "";
  dice: number;
  effectType: String = "";
  desc: String = "";
  extraEffect: number;
  duration: number;
  durationType: String = "";
  constructor(public name: string, public spellbookName: string, public spellbookID: string, public spellID: string) {

  }
}
