import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import * as firebase from "firebase";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {SpellPage} from "../spell/spell";

@IonicPage()
@Component({
  selector: 'page-spell-import',
  templateUrl: 'spell-import.html',
})
export class SpellImportPage {

  model: SpellbookModel;
  private firebasePromise: Promise<QuerySnapshot>;
  private firebaseDone: boolean = false;
  private requestor: SpellbookModel;

  selected: SpellModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider, public alertCtrl: AlertController) {
    this.model = new SpellbookModel("Import Spell");
    this.requestor = this.navParams.data.requestor;
    console.log(this.requestor);

    this.firebasePromise = this.firebase.downloadAllSpells();

    /*this.firebasePromise.then(querySnapshot => {
      console.log("Found collection");
      this.firebaseDone = true;
      this.model.pages = this.firebase.displaySpells(querySnapshot);
    });*/

    this.model.pages.push(new SpellModel("Test Spell"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellImportPage');
  }

  jumpToSpell(page: SpellModel) {
    this.navCtrl.push(SpellPage, {input: page, allowEdit: false});
  }
  
  select(spell: SpellModel) {
    let index = this.selected.indexOf(spell, 0);
    if (index > -1) {
      this.selected.splice(index, 1);
    } else {
      this.selected.push(spell);
    }
  }

  import(spell: SpellModel) {
    console.log("Importing " + spell.name);

    for (let i = 0; i < this.requestor.pages.length; i++) {
      if (this.requestor.pages[i].name == spell.name) {
        this.alertCtrl.create({
          title: "Duplicate Spell Found!",
          subTitle: "A spell of the same name was found in your spellbook.",
          buttons: [{
            text: "Replace",
            handler: () => {
              this.requestor.pages[i] = spell;
            }
          }, {
            text: "Add Anyway",
            handler: () => {
              this.requestor.pages.push(spell);
            }
          },
            {
              text: "Cancel",
              role: "cancel"
            }]
        }).present();
        break;
      }
    }
  }

}