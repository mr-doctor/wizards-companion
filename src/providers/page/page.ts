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
    this.pages.push(new SpellbookModel("Spellbook "+(this.currentPage++)));
  }
}


export class SpellbookModel {

  pages: SpellModel[] = [];
  currentPage: number = 1;

  constructor(public name: String) {

  }
}

export class SpellModel {
  constructor(public name: String, public castTime: String, public range: String) {

  }
}
