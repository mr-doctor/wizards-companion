import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {SpellbookPage} from "../spellbook/spellbook";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inputValue: string = "";

  constructor(public navCtrl: NavController) {

  }

  jumpToSpellbook() {
    // let input = this.inputValue;
    // let alert = this.alertCtrl.create({
    //   title: 'Welcome',
    //   subTitle: "Welcome to this demonstrative app, your name is " + input,
    //   buttons: ['OK']
    // });
    // alert.present();
    this.navCtrl.push(SpellbookPage);
  }


}
