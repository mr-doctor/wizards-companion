import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SpellbookPage } from '../pages/spellbook/spellbook';
import {SpellPage} from "../pages/spell/spell";
import { PageProvider } from '../providers/page/page';
import {SpellEditPage} from "../pages/spell-edit/spell-edit";
import {SpellbookEditPage} from "../pages/spellbook-edit/spellbook-edit";
import {IonicStorageModule} from "@ionic/storage";
import { FirebaseProvider } from '../providers/firebase/firebase';
import {Firebase} from "@ionic-native/firebase";
import {AngularFireModule} from "angularfire2";
import {AngularFireStorageModule} from "angularfire2/storage";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {SpellImportPage} from "../pages/spell-import/spell-import";
import {Toast} from "@ionic-native/toast";

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SpellbookPage,
    SpellPage,
    SpellEditPage,
    SpellbookEditPage,
    SpellImportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SpellbookPage,
    SpellPage,
    SpellEditPage,
    SpellbookEditPage,
    SpellImportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PageProvider,
    FirebaseProvider,
    Firebase,
    Toast,
  ]
})
export class AppModule {}
