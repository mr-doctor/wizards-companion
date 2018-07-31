import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PageProvider {

  pages: SpellbookModel[] = [];
  currentPage: number = 1;

  constructor() {
    console.log('Hello PageProvider Provider');
  }

  newSpellbook() {
    this.pages.push(new SpellbookModel("Spellbook "+(this.pages.length + 1)));
  }
}


export class SpellbookModel {

  pages: SpellModel[] = [];
  currentPage: number = 1;

  constructor(public name: String) {

  }
}

export class SpellModel {
  diceType: String = "";
  castTime: String = "";
  range: String = "";
  dice: number;
  effectType: String = "";
  desc: String = "";
  extraEffect: number;
  constructor(public name: String) {

  }
}
