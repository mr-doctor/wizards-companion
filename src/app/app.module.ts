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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SpellbookPage,
    SpellPage,
    SpellEditPage,
    SpellbookEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SpellbookPage,
    SpellPage,
    SpellEditPage,
    SpellbookEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PageProvider
  ]
})
export class AppModule {}
