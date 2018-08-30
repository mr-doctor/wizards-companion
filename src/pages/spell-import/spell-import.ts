import { Component } from "@angular/core";
import {AlertController, IonicPage, NavController, NavParams} from "ionic-angular";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {SpellbookModel, SpellModel} from "../../providers/page/page";
import * as firebaseLib from "firebase";
import QuerySnapshot = firebaseLib.firestore.QuerySnapshot;
import {SpellPage} from "../spell/spell";
import {Toast} from "@ionic-native/toast";

@IonicPage()
@Component({
  selector: "page-spell-import",
  templateUrl: "spell-import.html",
})
export class SpellImportPage {
  
  tab: string = 'global-spells';
  modelGlobal: SpellbookModel = new SpellbookModel("Import Spell", "");
  modelLocal: SpellbookModel = new SpellbookModel("", "");
  private firebasePromiseGlobal: Promise<QuerySnapshot>;
  private firebasePromiseLocal: Promise<QuerySnapshot>;
  private firebaseDone: boolean = false;
  private requestor: SpellbookModel;
  private popped = false;

  selected: SpellModel[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public firebase: FirebaseProvider,
              public alertCtrl: AlertController,
              private toast: Toast) {
    
    // creates the blank spellbook to hold the imported global spells
    this.modelGlobal = new SpellbookModel("Import Spell", "");
  
    // sets the spellbook wanting to import
    this.requestor = this.navParams.data.requestor;
  
    // creates the blank spellbook to hold the imported local spells
    this.modelLocal = new SpellbookModel("Import Spell from " + this.requestor.name, "");
    
    console.log(this.requestor);

    this.firebasePromiseGlobal = FirebaseProvider.downloadAllSpells();

    this.firebasePromiseGlobal.then(querySnapshot => {
      console.log("Found collection");
      this.modelGlobal.pages = this.firebase.displaySpells(querySnapshot);
    });
    
    let spellbookName: string = String(this.requestor.name) + this.requestor.id;
   
    this.firebasePromiseLocal = FirebaseProvider.downloadSpellsFrom(spellbookName);
  
    this.firebasePromiseLocal.then(querySnapshot => {
      console.log("Found collection");
      this.firebaseDone = true;
      this.modelLocal.pages = this.firebase.displaySpells(querySnapshot);
    });
    
    console.log(this.modelGlobal);
    console.log(this.modelLocal);
    
    this.popLoadingToast();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SpellImportPage");
  }

  jumpToSpell(page: SpellModel) {
    this.navCtrl.push(SpellPage, {input: page, allowEdit: false});
  }
  
  /**
   * Attempts to import the given spell, prompting the user if a duplicate is found
   * @param spell
   */
  import(spell: SpellModel) {
    console.log("Importing " + spell.name);
    
    // Make this spell belong to the spellbook, so that there are no collision errors in Firebase when it is reuploaded
    spell.spellbookName = String(this.requestor.name);
    spell.spellbookID = this.requestor.id;

    for (let i = 0; i < this.requestor.pages.length; i++) {
      if (this.requestor.pages[i].name == spell.name) {
        this.alertCtrl.create({
          title: "Duplicate Spell Found!",
          subTitle: "A spell of the same name was found in your spellbook.",
          cssClass: "custom-alert",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "cancel-button",
            },{
            text: "Replace",
            handler: () => {
              this.requestor.pages[i] = spell;
              this.popSpellToast(spell);
            },
          },{
            text: "Add",
            handler: () => {
              this.requestor.pages.push(spell);
              this.popSpellToast(spell);
            },
          },]
        }).present();
        return;
      }
    }
    this.requestor.pages.push(spell);
    this.popSpellToast(spell);
  }
  
  popSpellToast(spell: SpellModel) {
      this.toast.show("Added " + spell.name, "3000", "bottom").subscribe(
        toast => {
          console.log(toast);
        }
      );
  }
  
  popFailedToast() {
    if (this.popped) {
      return;
    }
    this.toast.show("No Spells Found", "5000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
    this.popped = true;
  }
  
  popLoadingToast() {
    this.toast.show("Loading...", "3000", "bottom").subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

}
