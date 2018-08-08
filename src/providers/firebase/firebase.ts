import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Firebase} from '@ionic-native/firebase';
import {SpellModel} from "../page/page";
import {AngularFireStorage} from "angularfire2/storage";
import {AngularFireDatabase} from "angularfire2/database";
import * as firebase2 from 'firebase';
import {environment} from "@app/env";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  
  public token: string;
  private userProfileCollection: any;
  
  constructor(private firebase: Firebase, private db: AngularFireDatabase, private afStorage: AngularFireStorage) {
    this.firebase.getToken()
      .then(token => this.token = token) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));
    
    this.firebase.onTokenRefresh()
      .subscribe((token: string) => this.token = token);
    firebase2.initializeApp(environment.firebase);
    
    this.userProfileCollection = firebase2.firestore.collection<any>('userProfile');
  
   this.userProfileCollection.push({
      name: 'Jorge Vergara',
      email: 'j@javebratt.com',
      // Other info you want to add here
   });
  }
  
  uploadSpell(spell: SpellModel) {
  
  }
  
  
}
