import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SpellbookPage} from "../../pages/spellbook/spellbook";
import {Storage} from "@ionic/storage";

/*
  Generated class for the SaveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SaveProvider {

  constructor(private storage: Storage) {
    console.log('Hello SaveProvider Provider');
  }

  saveSpellbook(page: SpellbookPage) {
    // this.storage.set("Spellbook " + page.pageID, page);
  }

}
