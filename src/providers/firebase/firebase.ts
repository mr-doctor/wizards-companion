import {Injectable} from '@angular/core';
import {SpellModel} from "../page/page";
import * as firebase from 'firebase';
import 'firebase/firestore';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseProvider {
  
  public token: string;
  
  constructor() {
    var config = {
      apiKey: "AIzaSyB3WtVe2EjpaNhcvey944ywVx3JjMNtTNU",
      authDomain: "wizard-s-companion.firebaseapp.com",
      databaseURL: "https://wizard-s-companion.firebaseio.com",
      projectId: "wizard-s-companion",
      storageBucket: "wizard-s-companion.appspot.com",
      messagingSenderId: "112408276315"
    };
    firebase.initializeApp(config);
  }
  
  uploadSpell(spell: SpellModel) {
    var spellJSON = JSON.parse(JSON.stringify(spell));
    var collectionReference = firebase.firestore().collection("Spells").add(spellJSON)
      .then(function () {
      console.log("Successfully uploaded");
    }).catch(function () {
      console.log("Failed to upload");
    });
  }

  downloadAllSpells() : Promise<QuerySnapshot> {
    const collectionReference = firebase.firestore().collection("Spells");

    return collectionReference.get();/*.then(querySnapshot => {
      console.log("Found collection");
      return this.displaySpells(querySnapshot);
    });*/
  }
  
  displaySpells(querySnapshot: QuerySnapshot) : SpellModel[] {
    if (querySnapshot.empty) {
      console.log("No docs found");
      return [];
    }
    const spells: SpellModel[] = [];
    querySnapshot.forEach(function (documentSnapshot) {
      let data = documentSnapshot.data();
      let spell = FirebaseProvider.toSpell(JSON.parse(JSON.stringify(data)));
      // console.log(spell);
      spells.push(spell);
    });

    return spells;
  }

  static toSpell(data: JSON) {
    const spell: SpellModel = new SpellModel(data["name"]);
    spell.castTime = data["castTime"];
    spell.duration = data["duration"];
    spell.dice = data["dice"];
    spell.range = data["range"];
    spell.durationType = data["durationType"];
    spell.extraEffect = data["extraEffect"];
    spell.diceType = data["diceType"];
    spell.desc = data["desc"];
    spell.effectType = data["effectType"];

    console.log(spell);
    return spell;
  }
  
  
}
