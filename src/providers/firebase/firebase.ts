import {HttpClient} from '@angular/common/http';
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

  downloadAllSpells() {
    var collectionReference = firebase.firestore().collection("Spells");

    collectionReference.get().then( querySnapshot => {
      console.log("Found collection");
      this.displaySpells(querySnapshot)
    });
  }
  
  displaySpells(querySnapshot: QuerySnapshot) {
    if (querySnapshot.empty) {
      console.log("No docs found");
      return;
    }
    querySnapshot.forEach(function (documentSnapshot) {
      var data = documentSnapshot.data();
      console.log(data);
    });
  }
  
  
}
