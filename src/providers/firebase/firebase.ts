import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SpellModel} from "../page/page";
import {environment} from "@app/env";
import firebase from "firebase";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  
  public token: string;
  private userProfileCollection: any;
  
  constructor() {
    firebase.initializeApp(environment.firebase);

  }
  
  uploadSpell(spell: SpellModel) {
    var spells = firebase.firestore().collection("test spellbook");
    console.log(spells.get());
  }
  
  
}
