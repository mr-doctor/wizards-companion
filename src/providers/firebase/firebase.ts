import {Injectable} from '@angular/core';
import {SpellModel} from "../page/page";
import * as firebaseAPI from 'firebase';
import 'firebase/firestore';
import QuerySnapshot = firebaseAPI.firestore.QuerySnapshot;

@Injectable()
export class FirebaseProvider {
  
  public token: string;
  
  constructor() {
  
    const config = {
      apiKey: "AIzaSyB3WtVe2EjpaNhcvey944ywVx3JjMNtTNU",
        authDomain: "wizard-s-companion.firebaseapp.com",
      databaseURL: "https://wizard-s-companion.firebaseio.com",
      projectId: "wizard-s-companion",
      storageBucket: "wizard-s-companion.appspot.com",
      messagingSenderId: "112408276315"
    };
  
    firebaseAPI.initializeApp(config);
  }
  
  uploadSpell(spell: SpellModel) {
    var spellJSON = JSON.parse(JSON.stringify(spell));
    firebaseAPI.firestore().collection("Spells").doc(spell.name).set(spellJSON)
      .then(function () {
      console.log("Successfully uploaded to global database");
    }).catch(function () {
      console.log("Failed to upload");
    });
  
    firebaseAPI.firestore().collection(spell.spellbookName).doc(spell.name).set(spellJSON)
      .then(function () {
        console.log("Successfully uploaded to personal spellbook");
      }).catch(function () {
        console.log("Failed to upload");
      });
  }

  static downloadAllSpells() : Promise<QuerySnapshot> {
    const collectionReference = firebaseAPI.firestore().collection("Spells");

    return collectionReference.get();
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
      spells.push(spell);
    });

    return spells;
  }

  static toSpell(data: JSON) {
    const spell: SpellModel = new SpellModel(data["name"], data["spellbookName"]);
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
