import { Component } from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams} from "ionic-angular";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import * as firebase from "firebase";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {SpellPage} from "../spell/spell";
import {Toast} from "@ionic-native/toast";

@IonicPage()
@Component({
  selector: "page-spell-import",
  templateUrl: "spell-import.html",
})
export class SpellImportPage {

  model: SpellbookModel;
  private firebasePromise: Promise<QuerySnapshot>;
  private firebaseDone: boolean = false;
  private requestor: SpellbookModel;

  selected: SpellModel[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public firebase: FirebaseProvider,
              public alertCtrl: AlertController,
              private toast: Toast) {
    this.model = new SpellbookModel("Import Spell");
    this.requestor = this.navParams.data.requestor;
    console.log(this.requestor);

    this.firebasePromise = FirebaseProvider.downloadAllSpells();

    this.firebasePromise.then(querySnapshot => {
      console.log("Found collection");
      this.firebaseDone = true;
      this.model.pages = this.firebase.displaySpells(querySnapshot);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SpellImportPage");
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
    spell.spellbookName = String(this.requestor.name);

    for (let i = 0; i < this.requestor.pages.length; i++) {
      if (this.requestor.pages[i].name == spell.name) {
        this.alertCtrl.create({
          title: "Duplicate Spell Found!",
          subTitle: "A spell of the same name was found in your spellbook.",
          cssClass: "custom-alert",
          buttons: [{
            text: "Replace",
            handler: () => {
              this.requestor.pages[i] = spell;
              this.popToast(spell);
            },
          },{
            text: "Add",
            handler: () => {
              this.requestor.pages.push(spell);
              this.popToast(spell);
            },
          },{
              text: "Cancel",
              role: "cancel",
              cssClass: "cancel-button",
            },]
        }).present();
        return;
      }
    }
    this.requestor.pages.push(spell);
    this.popToast(spell);
  }
  
  popToast(spell: SpellModel) {
    this.toast.show("Added " + spell.name, "3000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
