import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import * as firebase from "firebase";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider) {
    this.model = new SpellbookModel("Import Spell");
    this.requestor = this.navParams.data.requestor;
    console.log(this.requestor);

    this.firebasePromise = this.firebase.downloadAllSpells();

    this.firebasePromise.then(querySnapshot => {
      console.log("Found collection");
      this.firebaseDone = true;
      this.model.pages = this.firebase.displaySpells(querySnapshot);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpellImportPage');
  }

  import(spell: SpellModel) {
    console.log("Importing " + spell.name);

    this.requestor.pages.push(spell);
  }

}
